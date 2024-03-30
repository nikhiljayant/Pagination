import { useEffect, useState } from 'react';

function App() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);  
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page]);

  console.log(products)

  return (
    <div className='flex flex-col justify-center items-center'>
      {
        products.length > 0 ?
        (<>
          <div className='space-y-3 flex flex-col items-center justify-center m-10'>
            {
              products.map((prod) => (
                <div key={prod.id} className='bg-gray-100  rounded-md p-3 space-y-2'>
                  <img src={prod.thumbnail} alt={prod.title} className='rounded-md w-[250px] h-[150px] object-cover' />
                  <p className='font-bold'>{prod.title.slice(0,25)}<span className={prod.title.length>25 ? "visible" : "invisible"}>...</span></p>
                  <p className='text-sm'>{prod.description.slice(0, 32)}<span className={prod.description.length>32 ? "visible" : "invisible"}>...</span></p>
                  <div className='flex justify-between'>
                    <p>${prod.price}</p>
                    <div className='flex space-x-3'>
                        <p>Rating: <span className={prod.rating>3 ? "text-green-600" : "text-red-500"}>{prod.rating}</span></p>
                        <p>Stock: <span className={prod.stock>30 ? "text-green-600" : "text-red-500"}>{prod.stock}</span></p>
                    </div>
                  </div>
                </div>
              ))
            }
            {/* when all of the data is coming at once (no limit is there in the API to recieve specific number of data) */}
            {/* {
              products.slice(page * 10 - 10, page * 10).map((prod) => (
                <p key={prod.id}>{prod.title}</p>
              ))
            } */}
          </div>
          <div className='flex gap-5'>
            <span className={page===1 ? "invisible" : "visible text-2xl cursor-pointer"} onClick={() => setPage(page - 1)}>{"<"}</span>
            {
              [...Array(totalPages)].map((_, i) => (
                <p key={i} className={page===(i+1) ? 'bg-gray-200 border border-black py-2 px-3 cursor-pointer' : 'border border-black py-2 px-3 cursor-pointer'} onClick={() => setPage(i + 1)}>{i + 1}</p>
              ))
            }
            <span className={page===totalPages ? "invisible" : "visible text-2xl cursor-pointer"} onClick={() => setPage(page + 1)}>{">"}</span>
          </div>
        </>) : <div className='flex justify-center items-center h-screen'>No products found!</div>
      }
    </div>
  )
}

export default App
