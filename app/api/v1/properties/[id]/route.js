import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSession } from "@/utils/getSession";

export const GET = async (req , {params} ) => {
        try {
            //   connection of the database
                await connectDB();
                // Getting id from the Params 
              let  id  = params.id
              // Checking if the params id and if there is any property which matches
            const property  = await Property.findById(id);
            //  If Property Id did not match then throw the error 
            if(!property){
                return  new Response('Property Not found' , {status:404});
            }
              //  return the response and in reponse send the matched id property 
             return new Response(JSON.stringify(property), {status:200})
        } catch (error) {
            console.log(error)
            return new Response('Something went wrong', {status : 500})
        }
};


export const DELETE = async (req , { params} ) => {
        
            try {
              
              
              const  propertyId  = params.id ;  
                // Get session function has the session extracted in the function with user id and user info
              const sessionUser = await getSession();  

              // check to see if the user info and useer id exists
              if(!sessionUser || !sessionUser.userId){
                 return new Response('User ID is required' , {status: 401});
              }
              await connectDB();
              // destructure the userId from the sesseionUser 
              const { userId}  = sessionUser;
                // Connection to the database
              // Finding the property with the same user id as session user id
              const property = await Property.findById(propertyId);
              // If the property id did not match then throw the error 
              if(!property){
                   return new Reponse("Property Not Found" , { status: 404})
              }

              // Check the ownership of the property 
              if(property.owner.toString() !== userId){
                     return new Response("Unauthorized" , { status: 401})
              }

              // Deleting the property 
                 await property.deleteOne();

              // return the new respose with the console.log called property is deleted 

              return new Response('Property Deleted' ,{  status : 200})

            }catch(err){
                console.log(err);
                return new Response('Something went wrong' , { status: 404})
            }

}


export const PUT  = async (req , { params }) => {
  try {
     // Database connection 
      await connectDB();

      const sessionUser = await getSession();

      if(!sessionUser || !sessionUser.userId){
         return new Response('User ID is required' , {status:401});
      }

      const  { id } = params;
      const { userId } = sessionUser;

    

      const formData = await req.formData();
       
      // Access all the values of amenitites and Images
      const amenities = formData.getAll('amenities');


      const existingProperty = await Property.findById(id);

      if(!existingProperty){
          return new Reponse('Property Not Found', { status : 404});
      }

      if(existingProperty.owner.toString() !== userId ){
           return new Response('Property Not Found', { status : 404});
      }



      console.log(amenities);
      // Create property data object for the database 
      const propertyData = {
          type: formData.get('type'),
          name : formData.get('name'),
          description : formData.get('description'),
          location:{
             street : formData.get('location.street'), 
             city : formData.get('location.city'),
             state : formData.get('location.state'),
             zipcode : formData.get('location.zipcode')
          },
          beds: formData.get('beds'), 
          baths : formData.get('baths'),
          square_feet : formData.get('square_feet'),
          amenities, 
          rates:{
             weekly : formData.get('rates.weekly'), 
             monthly : formData.get('rates.monthly'), 
             nightly: formData.get('rates.nightly'), 
         }, 
         owner:userId,
         seller_info : {
              name : formData.get('seller_info.name'),
              email : formData.get('seller_info.email'),
              phone : formData.get('seller_info.phone')
         }, 

      }





        const updatedProperty = await Property.findByIdAndUpdate(id , propertyData);
      

      return new Response(JSON.stringify(updatedProperty) , {status:200});
    
  } catch (error) {
      console.log("This is the error we are looking for: ", error);
     return new Response(JSON.stringify({message:'Failed to add property '} , {status : 400}));
  }
}