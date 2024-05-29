
import {  FaBed , 
          FaBath ,
          FaMapMarker ,
           FaTimes ,
            FaCheck ,
             FaRulerCombined 
            } from "react-icons/fa";

import PropertyImages from "./PropertyImages";
import BookmarkButton from "./BookmarkButton";
import ShareButton from "./ShareButton";
import PropertyContactForm from "./PropertContactForm";


const PropertyDetails = ({property}) => {


    const { beds , baths }  = property ; 
    const Beds = () => {

        if(beds  ===  1){
           return 'Bed';
         }else {
             return 'Beds';
         }

    }

    const Baths  = () => {
       if(baths === 1){
        return 'Bath';
       }else{ 
        return 'Baths';
        }
    };

     
      return (
        <>
    
        <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div className="text-gray-500 mb-4">{property.type}</div>
              <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
              <div
                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <FaMapMarker className="text-orange-700 inline mt-1 mr-1 " />
                <p className="text-orange-700">
                  {property.location.street}, {property.location.city} {property.location.state}
                </p>
              </div>

              <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                Rates & Options
              </h3>
              <div className="flex flex-col md:flex-row justify-around">
                <div
                  className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                >
                  <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                  <div className="text-2xl font-bold">
                     {property.rates.nightly ? (<p className="font-bold text-green-700">${property.rates.nightly}</p>) : 
                     ( <FaTimes className="text-red-700" /> ) }
                  </div>
                </div>
                <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                  <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                  {property.rates.weekly ? (<div className="text-2xl font-bold text-green-700">${property.rates.weekly}</div>) : 
                      (<FaTimes className="text-red-700" />)}
                  
                </div>
                <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                  <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                  {property.rates.monthly ? (<div className="text-2xl font-bold text-green-700">${property.rates.monthly}</div>) :
                   (<FaTimes className="text-red-700" />)}
                  
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Description & Details</h3>
              <div
                className="flex justify-center gap-4 text-green-700 mb-4 text-xl space-x-9"
              >
                <p>
                  <FaBed className="inline mr-1 mb-1" /> {property.beds}
                  <span className="hidden sm:inline"> {Beds()}</span>
                </p>
                <p>
                   <FaBath className="inline mr-1 mb-2" /> {property.baths}
                  <span className="hidden sm:inline"> {Baths()}</span>
                </p>
                <p>
                  <FaRulerCombined className="inline mb-2 mr-1" />
                  {property.square_feet} <span className="hidden sm:inline">sqft</span>
                </p>
              </div>
              <p className="text-gray-500 mb-4 ">
                {property.description}
              </p>
             
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Amenities</h3>

              <ul
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"
              >
                {property.amenities.map((amenity , index) => (
                     <li key={index}>
                      <FaCheck className="inline mr-2 mb-1 text-green-700 " />
                      {amenity}
                   </li>
                ))}
               
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <div id="map"></div>
            </div>
          </main>
          <PropertyImages  images={property.images} />
          {/* <!-- Sidebar --> */}
          <aside className="space-y-4">       
          {/* Book mark button components */}
             <BookmarkButton property={property} />
           {/* Share Button component */}
           <ShareButton property={property} />

            {/* <!-- Contact Form --> */}
             <PropertyContactForm property={property} />
          </aside>
        </div>
      </div>
    </section>
  </>
      )
}


export default PropertyDetails ; 