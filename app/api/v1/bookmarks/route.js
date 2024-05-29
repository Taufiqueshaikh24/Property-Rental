import connectDB from "@/config/db";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSession } from "@/utils/getSession";

export const dynamic = 'force-dynamic';





export const GET = async (req) => {
    try{
          await connectDB();

          const sesssionUser = await getSession();

          if(!sesssionUser || !sesssionUser.userId){
              return new Response("User ID doesn't Exist");
          }

          const { userId } = sesssionUser ; 

          const user = await User.findOne({_id: userId});

          const bookmarks = await Property.find({_id : { $in : user.bookmarks}});


          return new Response(JSON.stringify(bookmarks), {status:200})



    }catch(error){
              console.log(error);
              return new Response('Something went Wrong ' , { status:500})
    }
}





export const POST  = async (req) => {
    try {
        //  connection of the database
        await connectDB();
        //  getting the propertyId form req 
        const { propertyId }  = await req.json();
        console.log(propertyId);
        // getting the sesssion 
        const sesssionUser = await getSession();
        // check to see if userid or user exists or not
        if(!sesssionUser || !sesssionUser.userId){
            return new Response("User ID didn't exists");
        }

        const { userId }  = sesssionUser ; 

        const user = await User.findOne({_id:userId})

        // check to see if the vairable is already bookmarked or not 
        let isBookMarked  = user.bookmarks.includes(propertyId);

         let message ; 

        if(isBookMarked){
                // if already bookmarked 
                user.bookmarks.pull(propertyId);
                message = 'Bookmark removed successfully'
                isBookMarked = false ; 

        }else{
              user.bookmarks.push(propertyId);
              message = 'Bookmark saved successfully';
              isBookMarked = true 
        }
            // saving the the user database 
          await user.save();

          return new Response(JSON.stringify({ message , isBookMarked } , { status: 200}))


    } catch (error) {
            console.log(error);
            return new Response('Something went wrong', { status: 500})
    }
}