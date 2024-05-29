// import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';





const PropertiesListingPage = async () => {

    const data = await fetchProperties();
   
      console.log(data[12])

    return (
        <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.properties.length === 0  ? (
                    <div>No Properties Found</div>) :
                     (<> { data.properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                   ))}</>)}

        </div>
        </div>
        </section>
    )
};

export default PropertiesListingPage