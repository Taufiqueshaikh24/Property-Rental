// import properties from '@/properties.json';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import { fetchProperties } from '@/utils/requests';
import PropertySeachForm from './PropertySearchForm';
import Properties from './Properties';


const HomeProperties = async  () => {
        
    const data = await fetchProperties();
    
    data.properties?.sort(() => Math.random() - Math.random()).slice(0 , 3);
    console.log(data);

   
    return (
        <>
        <section className="bg-green-700 py-4">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                <PropertySeachForm />
            </div>
        </section>
            <Properties />
       
        </>
    )
};  

export default HomeProperties ;