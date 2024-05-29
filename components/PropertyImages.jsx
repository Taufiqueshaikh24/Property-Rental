import Image from "next/image";
import { Gallery , Item } from "react-photoswipe-gallery";

export default function PropertyImages({images}){
      

    console.log(images[1])

    return (
        <Gallery>
         <section className="bg-white p-6 rounded-lg shadow" >
             <div className="container mx-auto">
                
                {images.length === 1 ? (

                    <>
                    <Item
                 original={images[0]}
                 thumbnail={images[0]}
                 width='1000'
                 height='600'>
                    {({ref , open}) => (
                        <Image 
                        ref={ref}
                        onClick={open}
                        src={images[0]}
                         className="object-cover h-[400px] mx-auto rounded-xl"
                         alt=""
                         width={1800}
                         height={400}
                         sizes="100vw"
                         priority={true}
                          />
                    )}
                </Item>
                     
                    </>
                ) : ( <>
                   
                     <div className="grid grid-cols-2 gap-2">
                         {images.map((image , i ) => (
                               <div key={i}
                               className={`${images.length === 3 && i == 2 
                                ? 'col-span-2' 
                                : 'col-span-1'}`}>
                                    <Item
                                     original={image}
                                     thumbnail={image}
                                     width='1000'
                                     height='600'>
                                    {({ref , open}) => (
                                         <Image 
                                         ref={ref}
                                         onClick={open}
                                         src={image}
                                         className="object-cover h-[400px] w-full rounded-xl"
                                         width={0}
                                         height={0}
                                         alt=""
                                         sizes="100vw"
                                         priority={true}
                                         />
                                    )}
                                    </Item>
                                     
                               </div>
                         ))}
                     </div>
                    
                </>)}
             </div>
         </section>
        </Gallery>
    )
}