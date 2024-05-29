import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSession } from "@/utils/getSession";



export const PUT = async (req , {params} ) => {
    try {
         await connectDB();

         let { id } = params ; 

         const sessionUser = await getSession();

         if(!sessionUser || !sessionUser.userId){
              return new Response('User ID is required' , {status : 400} ) 
         }

         const { userId } = sessionUser;

         const message = await Message.findById(id);

         if(!message){
             return new Response('Message not found' , { status : 404});
         }

        //  verify the owner ship

        if(message.recipient.toString() !== userId){
              return new Response('Unauthorized' , { status : 401});

        }

        //  Update the message 

        message.read =  !message.read

        await message.save();

        return new Response(JSON.stringify(message) , { status : 200})
        
    } catch (error) {
         console.log(error);
         return new Response('Something went Wrong' , { status:500})
    }
}


export const DELETE  = async (req , { params} ) => {
       try {
            await connectDB();

            const { id } = params ; 

            const sessionUser = await getSession();

            if(!sessionUser || !sessionUser.userId){
                 return new Response('User ID is required' , { status : 400});
            }
            
            const { userId } = sessionUser;

            const message = await Message.findById(id);

            if(!message){
                 return new Response('Message Not Found' , { status: 404})
            }

            // Verify the Owner Ship 
            if(message.recipient.toString() !== userId){
                return new Response('Unauthorized' , { status: 401})
            }

            await message.deleteOne();


            return new Response('Message Deleted' , { status : 200})

            
            
       } catch (error) {
             console.log(error);
             return new Response('Something went wrong',  { status : 500});
       }
}