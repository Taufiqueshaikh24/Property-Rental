import cloudinary from "@/config/Cloudinary";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSession } from "@/utils/getSession";


export const GET = async (request) => {
       await connectDB(); 
        try {

         const page = request.nextUrl.searchParams.get('page') || 1;
         const pageSize = request.nextUrl.searchParams.get('pageSize') || 2 ;

         const skip = (page - 1) * pageSize;

         const total = await Property.countDocuments({})
         // console.log(total);
             
         const properties  = await Property.find({}).skip(skip).limit(pageSize);

         const result = {
             total , 
             properties
         }

         return  new Response(JSON.stringify(result) , {status:200})

        } catch (error) {
            console.log(error);
           return  new Response(JSON.stringify({error:'Something went wrong'}) , {status:500})
        }
};


export const POST  = async (req) => {
     try {
        // Database connection 
         await connectDB();

         const sessionUser = await getSession();

         if(!sessionUser || !sessionUser.userId){
            return new Response('User ID is required' , {status:401});
         }

         const { userId } = sessionUser;

       

         const formData = await req.formData();
          
         // Access all the values of amenitites and Images
         const amenities = formData.getAll('amenities');
         const images  = formData.getAll('images').filter((image) => image.name !== '');

         console.log(amenities , images);
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

         // Upload images to Cloudinary

         let imageUploadPromises = [];

         for(const image of images ){
              const imageBuffer = await image.arrayBuffer();
              const imageArray = Array.from(new Uint8Array(imageBuffer));
              const imageData = Buffer.from(imageArray);


              // convert the image to base64

              const imageBase64 = imageData.toString('base64');

              // Make request to upload cloudinary 
              const result = await cloudinary.uploader.upload(
                   `data:image/png;base64,${imageBase64}`, {
                     folder: 'Property_Pulse'
                   }   
              )

              imageUploadPromises.push(result.secure_url)
            //    Wait for all Images to upload 
               const uploadedImages = await Promise.all(imageUploadPromises);
               // Add uploaded images to propertyData 
               propertyData.images = uploadedImages
         }



         const newProperty = new Property(propertyData);
         await newProperty.save();

        console.log(propertyData);

         

      //   return new Response(JSON.stringify({message:'success'}, {status:200}))
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
     } catch (error) {
         console.error("This is the error we are looking for: ", error);
        return new Response(JSON.stringify({message:'Failed to add property '} , {status : 400}))
     }
}