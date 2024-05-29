

const fetchProperties  = async () => {
      try {
         // Fetching the the properties from the Api 
         let res = await fetch('http://localhost:3000/api/v1/properties', 
        //  Image was not coming after the upload so this is the solution to upload rightaway
        // because of this we need to hard refresh to the page get ned properties
        // so for this we have to do cache  : "no-store"
         { cache:"no-store" });
         // If the fetch failed 
         if(!res.ok){
          throw new Error('Failed to fetch the data');
        }
        return res.json();
      } catch (error) {
          console.log(error)
          return [];
      }
}; 


const fetchProperty = async (id) => {
    try{
        let res = await fetch(`http://localhost:3000/api/v1/properties/${id}`);
        if(!res.ok){
             return new Error('Failed to fetch the data'); 
        }
        return res.json();
    }catch(error){
            console.log(error);
    }
}
export { fetchProperties , fetchProperty };