import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSession } from "@/utils/getSession";


export const dynamic = 'force-dynamic';

export const GET = async (req) => {
        try {
            await connectDB();


            const sessionUser = await getSession();

            if(!sessionUser || !sessionUser.userId ){
                 return new Response('User ID is required' , { status:400});
            }

            const { userId } = sessionUser; 

            const unreadMessages = await Message.countDocuments({
                 recipient : userId, 
                 read : false 
            })

            return new Response(JSON.stringify(unreadMessages) , { status : 200});
            

        } catch (error) {
                console.log(error);
                return new Response('Something went Wrong' , { status : 500});
        }
}