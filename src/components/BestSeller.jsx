
import { useProducts } from '@/hooks/products/useProducts';
import ProductCard from './product/ProductCard';
import ProductCardSkeleton from './product/skeletons/ProductCardSkeleton';
export const BestSeller = () => {

    const { products, isLoading, isError, error, } = useProducts({ sort: "bestSeller", limit: 8 })

    console.log("products from hook", products)

    if (isLoading) {
        return (
            <>
                <h3 className="text-2xl font-semibold mb-8 text-center">
                    Best Selling Items
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            </>
        );
    }
    if (isError) return <div>Error fetching products: {error.message}</div>;

    return (
        <>
            <h3 className="text-2xl font-semibold mb-8 text-center">
                Best Selling Items
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
    );
};

//  <div className=''>
//                 <div className='mx-auto'>
//                     <h2 className='font-bold py-4 text-2xl flex justify-center items-center bg-gray-200'>Best Seller</h2>
//                     <div className='flex flex-wrap '>
//                         {productsToShow.map((product, index) => {
//                             return <div key={index} className='py-1 border border-gray-300 flex flex-col my-16 gap-10 mx-auto'>
//                                 <img src={product?.images[0]} alt='title' className='h-32 w-72 bg-gray-200 p-1' />
//                                 <div className='bg-gray-100 w-72 h-20 flex flex-col justify-center items-center'>
//                                     <p className='font-bold px-1'>{product?.title}</p>
//                                     <p className='px-1'>{product?.description}</p>
//                                 </div>
//                                 <div className='flex justify-around border-t border-gray-300 p-4'>
//                                     {/* <div onClick={() => navigate(`edit/${product?._id}`)}><AiFillEdit color='blue' /></div> */}
//                                     <div onClick={() => navigate(product?.slug)} className='cursor-pointer flex flex-col justify-center items-center'>
//                                         <BsFillEyeFill color='Blue' />
//                                         <span>View Product</span>
//                                     </div>

//                                     <div onClick={() => handleDelete(`/${product?._id}`)} className='cursor-pointer flex flex-col justify-center items-center'>
//                                         <BsCart3 color='green' />
//                                         <span>Add to Cart</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         })}
//                    </div>

//                 </div>
//             </div>

//             <div className='flex justify-center items-center ml-auto my-10'>
//                 <button className=' bg-gray-600 flex justify-center items-center text-white px-2 py-2 rounded-sm'>
//                     <HiChevronLeft />
//                 </button>
//                 {/* <div>{pages.map((x) => { return <button key={x} onClick={() => handleClick(x)} className={'bg-teal-600 p-2 mx-4 text-white hover:bg-teal-200 rounded-lg ${x !== currentPage && "bg-white text-teal-600" }'}> {x}</button> })}</div> */}
//                 <div>
//                     {pages.map((x) => (
//                         <button
//                             key={x}
//                             onClick={() => handleClick(x)}
//                             className={`px-3 py-1 m-1 rounded-sm ${x === currentPage
//                                 ? 'bg-gray-600 text-white'
//                                 : 'bg-white text-gray-600 border border-gray-600'
//                                 }`}
//                         >
//                             {x}
//                         </button>
//                     ))}
//                 </div>

//                 <button className='flex justify-center items-center text-white bg-gray-600 px-2 py-2 rounded-sm'>
//                     <HiChevronRight />
//                 </button>
//             </div >