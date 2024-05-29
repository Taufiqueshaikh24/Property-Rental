'use client';
import { useState , useEffect } from 'react';
import Spinner from './Spinner';
import PropertyCard from './PropertyCard';
import Pagination from './Pagination';

export default function Properties(){

    const [properties , setProperties] = useState([]);
    const [loading , setLoading ] = useState(true);
    const [page , setPage] = useState(1);
    const [pageSize , setPageSize] = useState(2);
    const [totalItems  , setTotalItems] = useState(0);

   
    useEffect(() => {
        const fetchProrperties = async () => {
              try {
                  const res = await fetch(`http://localhost:3000/api/v1/properties?page=${page}&pageSize=${pageSize}`);
                  if(res.status === 200){
                      const data = await res.json();
                      setProperties(data.properties);
                      setTotalItems(data.total);
                  }
              } catch (error) {
                 console.log(error);
              }finally{
                   setLoading(false);
              }
        }
          fetchProrperties();
    }, [page , pageSize])

            const onpageChange = (newPage) => {
                setPage(newPage)
            }

    console.log(properties);


    return loading ? <Spinner loading={loading} /> : (
        <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Recent Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {properties?.length === 0 ? (<h1>No Properties Founds</h1>) 
                       : properties?.map((property) => (
                             <PropertyCard key={property._id} property={property} />
                       )) }
                </div>
                <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onpageChange={onpageChange} />
        </div>
        </section>
    )
}