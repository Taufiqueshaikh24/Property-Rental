import connectDB from "@/config/db";
import Property from "@/models/Property";


export const GET =  async ( req  ) => {
        try {
            await connectDB();

            const { searchParams }  = new URL(req.url);
            const location = searchParams.get('location');
            const propertyType  = searchParams.get('propertyType');

            const locationPattern = new RegExp(location , 'i' );

            let query = {
                 $or : [
                     { name : locationPattern}, 
                     { description : locationPattern},
                     { 'location.street' : locationPattern},
                     { 'location.state' : locationPattern},
                     { 'location.city' : locationPattern},
                     { 'location.zipcode' : locationPattern},
                 ]
            }

            if(propertyType && propertyType !== 'All'){
                   const typePattern  =  new RegExp(propertyType , 'i')
                   query.type = typePattern;
            }

                const properties = await Property.find(query);
                console.log(location , propertyType)
            return new Response(JSON.stringify(properties) , { status:200})
        } catch (error) {
            console.log(error);
            return new Response('Something went wrong' , { status:500})
        }
};

