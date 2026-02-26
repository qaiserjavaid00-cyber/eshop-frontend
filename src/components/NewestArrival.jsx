import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { deleteProductAPI, getHomeProductsAPI } from '../Api/productApi'

import { BsCart3, BsFillEyeFill } from 'react-icons/bs'
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"


import { useNavigate, useSearchParams } from "react-router-dom";

export const NewestArrival = ({ newest }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();


    // Set "sort=newest" on first render
    // useEffect(() => {
    //     searchParams.set("sort", "newest");
    //     setSearchParams(searchParams);
    // }, [searchParams, setSearchParams]);


    // const sort = searchParams.get("sort");

    const limit = 3
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["products", { sort: newest, page, limit }],
        queryFn: () => getHomeProductsAPI({ sort: newest, page, limit }),
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }
    });
    ////pagination info 


    console.log(data?.products)
    const pageCount = data?.numOfPages;
    console.log("page count = ", pageCount)
    const currentPage = data?.currentPage;
    console.log("current page = ", currentPage)
    const pages = Array.from({ length: pageCount }, (_, index) => { return index + 1 })
    console.log(pages)


    function handleClick(pageNumber) {


        setPage(pageNumber)
        console.log("page number", page)
        // searchParams.set('page', pageNumber)
        // setSearchParams(searchParams);
        // console.log(searchParams)

    }

    //////delete

    const { mutate: remove } = useMutation({
        mutationKey: ["products"],
        mutationFn: deleteProductAPI,
        onError: (error) => {
            alert(error?.response?.data?.message)
            console.log(error)
        },
    });

    function handleDelete(id) {
        remove(id, {
            onSuccess: () => {
                refetch();
            },
            onError: (error) => {
                alert(error?.response?.data?.message)
                console.log(error)
            },

        });
    }



    // if (isLoading) return <div>Loading products...</div>;
    if (isLoading)
        return (
            <div className="flex justify-center items-center h-60">
                <div className="relative w-16 h-16">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full"
                            style={{
                                transform: `rotate(${i * 45}deg) translate(28px)`,
                                transformOrigin: 'center',
                                animation: 'dot-spin 1s linear infinite',
                                animationDelay: `${i * 0.125}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        );

    if (isError) return <div>Error fetching products: {error.message}</div>;
    const productsToShow = data?.products;
    return (
        <>



            <div className=''>
                <div className='py-4'>

                    <h2 className='font-bold py-4 text-2xl bg-gray-200 flex justify-center items-center'>New Arrivals</h2>



                    <div className='flex flex-wrap w-full mx-auto'>
                        {productsToShow.map((product, index) => {
                            return <div key={index} className='py-1 border border-gray-300 flex flex-col my-12 mx-auto w-[28%]'>
                                <div className='flex flex-col justify-center items-center'>
                                    <img src={product?.images[0]} alt='title' className='h-36 w-[24rem] bg-gray-100 p-2' />
                                    <p className='font-bold p-1'>{product?.title}</p>
                                    <p className='p-1'>{product?.description}</p>
                                </div>
                                <div className='flex justify-around border-t border-gray-300 p-4'>

                                    <div onClick={() => navigate(product?.slug)} className='cursor-pointer flex flex-col justify-center items-center'>
                                        <BsFillEyeFill color='Blue' />
                                        <span>View Product</span>
                                    </div>

                                    <div onClick={() => handleDelete(product?._id)} className='cursor-pointer flex flex-col justify-center items-center'>
                                        <BsCart3 color='green' />
                                        <span>Add to Cart</span>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>

                </div>
            </div>
            <div className='flex justify-center items-center ml-auto my-10'>
                <button className=' bg-gray-600 flex justify-center items-center text-white px-2 py-2 rounded-sm'>
                    <HiChevronLeft />
                </button>
                {/* <div>{pages.map((x) => { return <button key={x} onClick={() => handleClick(x)} className={'bg-teal-600 p-2 mx-4 text-white hover:bg-teal-200 rounded-lg ${x !== currentPage && "bg-white text-teal-600" }'}> {x}</button> })}</div> */}
                <div>
                    {pages.map((x) => (
                        <button
                            key={x}
                            onClick={() => handleClick(x)}
                            className={`px-3 py-1 m-1 rounded-sm ${x === currentPage
                                ? 'bg-gray-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-600'
                                }`}
                        >
                            {x}
                        </button>
                    ))}
                </div>

                <button className='flex justify-center items-center  text-white bg-gray-600 px-2 py-2 rounded-sm'>
                    <HiChevronRight />
                </button>
            </div >

        </>
    );
};
