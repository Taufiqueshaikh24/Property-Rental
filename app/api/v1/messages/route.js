import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSession } from "@/utils/getSession";
import { connect } from "mongoose";

export const dynamic = 'force-dynamic'; 

export const POST = async (req) => {
         try {
                await connectDB();

                const { name , email , phone , message  , property  , recipient} 
                = await  req.json();

                const sessionUser  = await getSession();

                if(!sessionUser || !sessionUser.userId){
                     return new Response(JSON.stringify({ message : 'You must be logged in to message' }, {status: 401}))
                }
                const { userId} = sessionUser ; 

                if(userId === recipient){
                    return new Response(JSON.stringify({ message : 'Can\'t send message to yourself' }, {status: 400}))
                }

                const newMessage  = new Message({
                        sender : userId , 
                        recipient , 
                        property ,
                        name , 
                        email , 
                        phone , 
                        body: message , 
                })

                await newMessage.save();

                console.log(newMessage)

                return new Response(JSON.stringify({ message : 'Message Sent'}) , { status : 200});

         } catch (error) {
              console.log(error);
              return new Response('Something went wrong' , { status : 500});
         }
};




export const GET  = async (req) => {
     try {
           await connectDB();

           const sessionUser = await getSession();

           if(!sessionUser || !sessionUser.userId){
                return new Response('User ID is required ' , { status : 400});
           }

           const { userId } = sessionUser  ; 

           const readMessages = await Message.find({ recipient : userId , read: true})
           .sort({createadAt : -1 }) // Sort read message in ASC order
           .populate('sender', 'username')
           .populate('property',  'name')

           const unreadMessages = await Message.find({ recipient : userId , read: false})
           .sort({createadAt : -1 }) // Sort read message in ASC order
           .populate('sender', 'username')
           .populate('property',  'name')

           const message = [...unreadMessages , ...readMessages]


           return new Response(JSON.stringify(message) , { status: 200})

           
     } catch (error) {
           console.log(error);
          return new Response('Somthing went wrong' , { status : 400})
     }
};

