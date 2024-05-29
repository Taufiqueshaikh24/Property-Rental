"use client";
import { useParams } from "next/navigation";
import { useEffect , useState } from "react";
import Link from 'next/link';
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import Spinner from "@/components/Spinner";


const propertiesPageDetails = () => {

            const { id } = useParams()
            const [property , setProperty] = useState(null);
            const [loading , setLoading] = useState(true);

            useEffect(() => {
                const fetchPropertyData = async () => {
                  if (!id) return;
                  try {
                    const property = await fetchProperty(id);
             
                    setProperty(property);
                  } catch (error) {
                    console.error("failed to fetch property: ", error);
                  } finally {
                    setLoading(false);
                  }
                
                };
                if (property === null) {
                    fetchPropertyData();
                  }
                
              }, [id, property]);

      if (loading) return <Spinner loading={loading} />;
 
      if (!property) return <h1> No Property Found </h1>;


      return (
        <>
      
          <PropertyHeaderImage  image={property.images[0]} />
        
        {/* Go back section */}
        <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-green-700 hover:text-green-600 flex items-center"
        >
          <FaArrowLeft className="inline mr-2 flex items-center " />   Back to Properties
        </Link>
      </div>
    </section>

    {/* Propety Information section  */}
        <PropertyDetails property={property} />
    
        </>
      );
};

export default propertiesPageDetails ; 