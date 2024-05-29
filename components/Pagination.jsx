


export default function Pagination({ page , pageSize , totalItems , onpageChange }){

    const totalPages = Math.ceil(totalItems / pageSize);
      
     const handleChange = (newPage) => {
            if(newPage >= 1 && newPage <= totalPages ){
                 onpageChange(newPage);
            }
     }
      
    return(
        // <!-- Pagination -->
        <section className="container mx-auto flex justify-center items-center my-8">
          <button className="mr-2 px-2 py-1 bg-green-700 text-white hover:bg-green-600 rounded" disabled={page === 1}
            onClick={() =>  handleChange(page - 1)}>
            Previous
          </button>
          <span className='mx-2'>
            Page {page} of {totalPages}
          </span>
          <button onClick={() => handleChange(page + 1)}
            className='ml-2 px-2 py-1 border bg-green-700 text-white hover:bg-green-600 rounded' disabled={page === totalPages}>
            Next
          </button>
        </section>
      )
}