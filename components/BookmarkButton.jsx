import { useState , useEffect } from "react"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { FaBookmark } from "react-icons/fa"
import Spinner from "./Spinner";

export default function BookmarkButton({ property  }){
    
     const {data : session }  = useSession();
      const userId = session?.user?.id;
     const [isBookMarked , setIsBookMarked] = useState(false);
     const [loading  , setLoading ] = useState(true);

     useEffect(() => {
          if(!userId){
                setLoading(false);
                return ;
          }


           const checkBookmarkStatus  =  async () => {
            try {
              const res = await fetch('http://localhost:3000/api/v1/bookmarks/check', {
                  method:'POST',
                  headers : {
                    'Content-Type' : 'application/json',
                  },
                  body: JSON.stringify({
                      propertyId : property._id
                  })

              })

              if(res.status === 200){
                   const data = await res.json();
                   setIsBookMarked(data.isBookMarked);
              }

            } catch (error) {
                  console.log(error);
                toast.error('Something went wrong');
            }finally{
                 setLoading(false)
            }
           };
           checkBookmarkStatus();
     }, [property._id , userId])

     const handleClick = async () => {
              if(!userId){
                 toast.error('Please Login to Bookmark the Property');
              }
              try {
                const res = await fetch('http://localhost:3000/api/v1/bookmarks', {
                    method:'POST',
                    headers : {
                      'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        propertyId : property._id
                    })

                })

                if(res.status === 200){
                     const data = await res.json();
                     toast.success(data.message);
                     setIsBookMarked(data.isBookMarked);
                }

              } catch (error) {
                // console.log(error);
                  // toast.error('Something went wrong');
              }
     }

     if(loading){
         return <Spinner   loading={loading} />
     }

        return !isBookMarked ?  (
            <>
                 <button onClick={handleClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
              >
              <FaBookmark className="mr-2" /> Add Bookmark 
            </button>
            </>
        ) : (<>

            <button onClick={handleClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
              >
              <FaBookmark className="mr-2" /> Remove Bookmark
            </button>

        </>)

}