"use client"
import { useState } from "react"; 
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";


export default function PropertyContactForm({ property }){


       const { data: session } = useSession();



      const [ name , setName ] = useState('');
      const [ email , setEmail ] = useState('');
      const [ phone , setPhone ] = useState('');
      const [ message , setMessage ] = useState('');
      const [wasSubmitted , setWasSubmitted] = useState(false);

      const handleSubmit = async (e) => {
            e.preventDefault();
            const data = {
                name , 
                email , 
                phone , 
                message , 
                property : property._id , 
                recipient : property.owner
            }
            console.log(data);

                try {
                  const res  = await fetch('http://localhost:3000/api/v1/messages', {
                    method:'POST', 
                    headers: {
                      'Content-Type' : 'application/json',
                    },
                        body: JSON.stringify(data)
                    });
                    
                    if(res.status === 200){
                      toast('Message Sent Successfully');
                      setWasSubmitted(true)
                    }else if(res.status === 401 || res.status === 400){
                          const Obj = await res.json();
                          toast.error(Obj.message);
                    }else{
                      toast.error('Cannot send message to yourself')
                        }
                      } catch (error) {
                    console.log(error);
                    toast.error(error);
                  }finally {
                    setName('')
                    setMessage('')
                     setEmail('')
                     setPhone('')
                }

                console.log(data);

      };

      return(
        <>
            {!session ? (<LoginButton />) : (
              <>
                  <div className="bg-white p-6 rounded-lg shadow-md">
               { wasSubmitted ? (<>
                 
                <p className="text-green-700">
                   Your message has been sent successfully
                </p>
               
               </>) : (<>


               { session.user.id === property.owner ? (<>
                    <p className="text-green-700">
                       Can't send message to yourself
                    </p>
               </>) : (<>

                <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
              <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  Name:
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  placeholder='Enter your name'             
                  value={name}
                  onChange={ (e) => setName(e.target.value)}
                  required
                />
              </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                    >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='phone'
                  >
                    Phone:
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='phone'
                    type='text'
                    value={phone}
                    onChange={ (e) => setPhone(e.target.value)}
                    placeholder='Enter your phone number'
                    />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                    >
                    Message:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Enter your message"
                    value={message}
                    onChange={ (e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <div>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                    type="submit"
                  >
                    <FaPaperPlane className="mr-2" /> Send Message
                  </button>
                </div>
              </form>
               
               </>) }

      
               
               </>)}
            </div>
              </>
            )}
        </>
      )
}