import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { createCatAPI, deleteCatAPI, getAllCatsAPI } from '../Api/catApi';


export const CreateCategory = () => {

    const { register, handleSubmit } = useForm();
    const [keyWord, setKeyword] = useState("");

    /////fetch all categories

    const { data, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCatsAPI,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }

    })

    ////craete category

    const { mutate, isMutating } = useMutation({
        mutationKey: ["categories"],
        mutationFn: createCatAPI,
        onError: (error) => {
            alert(error?.response?.data?.message)
            console.log(error)
        },
    });

    function onSubmit(formData) {
        mutate(formData, {
            onSuccess: (data) => {
                alert(`Category: ${data?.category?.name} added successfully`)
                refetch();
            }
        });
    }

    //////delete

    const { mutate: remove } = useMutation({
        mutationKey: ["categories"],
        mutationFn: deleteCatAPI,
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
    function handleSearchChange(e) {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
    }

    const searched = (keyWord) => (cat) => cat.name.toLowerCase().includes(keyWord)

    return (
        <>
            <div className='p-10'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full '>
                    <div className='font-bold text-lg md:text-2xl'>Add Category</div>
                    <input
                        type="text"
                        className='border-b-2 border-orange-400 focus:outline-none focus:border-gray-600'
                        {...register("name")}
                        placeholder='Name'
                    />
                    <button type='submit' className='p-1 bg-orange-400 hover:bg-orange-600 text-white duration-300 rounded-md my-5 w-1/4'>
                        {isMutating ? "saving..." : "save"}
                    </button>
                </form>
                <div>
                    <input
                        type="text"
                        className='border-b-2 border-orange-400 focus:outline-none focus:border-gray-600 w-full my-4'
                        defaultValue={keyWord}
                        onChange={handleSearchChange}
                        placeholder='Filter'
                    />
                </div>
                <div>
                    {data?.categories?.filter(searched(keyWord))?.map((category, index) => {
                        return <div key={index} >
                            <div className='px-2 py-4 my-2 w-full flex justify-between items-center bg-orange-100  '>
                                <span>{category?.name}</span>
                                <span>{category?.slug}</span>
                                <div className='flex gap-5'>
                                    <button onClick={() => ("/updateCtegory")}><AiFillEdit color="red" /></button>
                                    <button onClick={() => handleDelete(category?._id)}><AiFillDelete color="orange" /></button>
                                </div>

                            </div>

                        </div>
                    })}
                </div>

            </div>
        </>
    )
}
