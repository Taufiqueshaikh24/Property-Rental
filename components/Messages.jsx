"use client";
import { useState , useEffect } from "react";
import Spinner from "@/components/Spinner";
import Message from "./Message";

export default function Messages(){

      const [message , setMessage] = useState([]);
      const [loading , setLoading ] = useState(true);

      useEffect(() => {
          const getMessage = async () => {
                 try {
                    const res = await fetch('http://localhost:3000/api/v1/messages')
                        if(res.status === 200){
                             const data = await res.json();
                             setMessage(data)
                        }
                 } catch (error) {
                     console.log('Error fetching the data ',error);

                 }finally {
                      setLoading(false);
                 }
          }
          getMessage();
      },[])

     return (

          
          <>
            { loading ? <Spinner loading={loading} /> : (

<section className="bg-blue-50">
<div className="container m-auto py-24 max-w-6xl">
  <div
    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
  >
    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

    <div className="space-y-4">
        { message.length === 0 ? (<>You have No Messages</>) : 
          (<>
            { message.map((mess)=> (
                 <Message  key={mess._id} message={mess} />
            ))}
          </>) }
    </div>
  </div>
</div>
</section>
                
            )}
                  
          </>
    
)


}