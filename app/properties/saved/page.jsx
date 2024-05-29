"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";


export default function SavedPropertiesPage(){
        
        const [properties , setProperties]  = useState([])
        const [loading , setLoading] = useState(true);

        useEffect(() => {
            const savedBookmarks = async () => {
                  try {
                    const res = await fetch('http://localhost:3000/api/v1/bookmarks')

                    if(res.status === 200){
                          const data = await res.json();
                          setProperties(data);
                    }else{
                        console.log(res.statusText);
                        toast.error('Failed to fetch the saved Properties');
                    }
                  } catch (error) {

                    console.log(error);
                    toast.error('Something went wrong');
                      
                    
                  }finally {
                      setLoading(false);
                  }
              
            }

             savedBookmarks();


        } , [])


        console.log(properties);

            return loading ? (
                    <Spinner loading={loading} />  
            ) : (
                
                <section className="px-4 py-6">
                    <h1 className="text-2xl mb-4 text-center underline text-green-700">Saved Properties</h1>
                <div className="container-xl lg:container m-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.length === 0  ? (<div>No Saved Properties Found</div>) :
                     (<> { properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                   ))}</>)}
                   
        
                </div>
                </div>
                </section>
   )
}