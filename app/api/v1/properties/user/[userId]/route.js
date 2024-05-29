import connectDB from "@/config/db";
import Property from "@/models/Property";

export const GET  =   async (req , {params})  => {
    try{
        await connectDB();
        // Get the user ID 
        const userId  = params.userId; 
        if(!userId){
              return new Response('User ID is not Valid', { status:400})
        }
        const properties  = await Property.find({owner:userId})
          
          return new Response(JSON.stringify(properties) , { status:200});
    }catch(error){
            console.log(error);
            return new Response(`Error: ${error}` , { status:500} )

    }
}