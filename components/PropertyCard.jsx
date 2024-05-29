import Link from "next/link";
import Image from "next/image";
import {FaBed , FaBath  , FaRulerCombined , FaMoneyBill  , FaMapMarker}   from 'react-icons/fa'; 


const PropertyCard = ({property}) => {

          const getRatesDisplay = () => {
              const {monthly , weekly , nightly}  = property.rates;

              // if(rates.monthly){
              //      return  `${rates.monthly.toLocaleString()}/mo`;
              // }else if(rates.weekly){
              //      return  `${rates.weekly.toLocaleString()}/wk`
              // }else if(rates.nightly){
              //       return `${rates.nightly.toLocaleString()}/nightly`
              // }

              if(monthly){
                 return `${monthly.toLocaleString()}/mo`
              }else if(weekly){
                  return `${weekly.toLocaleString()}/wk`
              }else if(nightly){
                   return `${nightly.toLocaleString()}/nightly`
              }
          };

          const { beds , baths }  = property ; 
          const singularOrPlural = () => {

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
            <div className="rounded-xl shadow-md relative">
            <Image
              // src={`/images/properties/${property.images[0]}`}
              src={`${property.images[0]}`}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className='w-full h-auto rounded-t-xl'
            />
            <div className="p-4">
              <div className="text-left md:text-center lg:text-left mb-6">
                <div className="text-gray-600">{property.type}</div>
                <h3 className="text-xl font-bold">{property.name}</h3>
              </div>
              <h3
                className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-green-700 font-bold text-right md:text-center lg:text-right"
              >
                ${ getRatesDisplay() }
              </h3>

              <div className="flex justify-center gap-4 text-gray-500 mb-4">
                <p>
                  <FaBed className="inline mr-2 " /> {property.beds}
                  <span className="md:hidden lg:inline"> {singularOrPlural()}</span>
                </p>
                <p>
                  <FaBath className="inline mb-2 mr-2" /> {property.baths}
                  <span className="md:hidden lg:inline"> {Baths()}</span>
                </p>
                <p>
                  <FaRulerCombined className="inline mr-2 mb-2" />
                  {property.square_feet} <span className="md:hidden lg:inline">sqft</span>
                </p>
              </div>

              <div
                className="flex justify-center gap-4 text-green-900 text-sm mb-4"
              > 
                 {  property.rates.monthly && (  <p><FaMoneyBill className="inline mr-1 mb-1" />Monthly ${property.rates.monthly}</p>)}
                 {  property.rates.weekly && (  <p><FaMoneyBill className="inline mr-1 mb-1" />Weekly ${property.rates.weekly}</p>)}
                 {  property.rates.nightly && (  <p><FaMoneyBill className="inline mr-1 mb-1" />Nightly ${property.rates.nightly}</p>)}
                  
              </div>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                   <FaMapMarker className="text-orange-700 inline mt-1" />
                  <span className="text-orange-700"> {property.location.city} {property.location.state}</span>
                </div>
                <Link
                  href={`/properties/${property._id}`}
                  className="h-[36px] bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        )
};

export default PropertyCard;