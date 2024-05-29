"use client";
import { useState , useEffect } from "react"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import PropertySeachForm from "@/components/PropertySearchForm";



export default function searchResultsPage(){
    const [properties , setProperties] = useState([]);
    const [ loading , setLoading ] = useState(true);

      const searchParams  = useSearchParams();

      const location = searchParams.get('location');
      const propertyType = searchParams.get('propertyType');

      useEffect(() => {
            const fetchProperty = async () => {
                   try {
                    const res = await fetch(`http://localhost:3000/api/v1/properties/search?location=${location}&propertyType=${propertyType}`)

                    if(res.status === 200){
                          const data = await res.json();
                          setProperties(data);

                    }
                   } catch (error) {
                        console.log(error);
                   }finally{
                       setLoading(false);
                   }
            }
             fetchProperty();
      } , [ location , propertyType])

    console.log(properties);
    return (
        <>
           <section className="bg-green-700 py-4">
              <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px">
                  <PropertySeachForm  />
              </div>
           </section>
           { loading ? <Spinner  loading={loading} /> : (
                <>
                     <section className="px-4 py-6">
                   <Link href='/properties' className="flex item-center text-green-700 hover:underline mb-4">
                      <FaArrowAltCircleLeft  className="mr-1 mt-1" /> Back to Search Properties
                   </Link>
                <div className="container-xl lg:container m-auto px-4 py-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {properties.length === 0  ?
                     (<div>No Properties Found</div>) :
                     (<> { properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                   ))}</>)}
        
                </div>
                </div>
                </section>
                
                </>
            ) }
        </>
    )
}