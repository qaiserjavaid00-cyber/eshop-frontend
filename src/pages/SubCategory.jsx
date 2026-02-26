import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { createSubAPI, deleteSubAPI, getAllsubsAPI } from '../Api/subApi';
import { getAllCatsAPI } from '../Api/catApi';



export const SubCategory = () => {

    const { register, handleSubmit } = useForm();
    const [keyWord, setKeyword] = useState("");



    /////fetch all sub categories

    const { data, refetch } = useQuery({
        queryKey: ["subs"],
        queryFn: getAllsubsAPI,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }

    })


    ///////fetch all categories to show as parent

    const { data: cats } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCatsAPI,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }

    })


    ////craete sub category

    const { mutate, isMutating } = useMutation({
        mutationKey: ["subs"],
        mutationFn: createSubAPI,
        onError: (error) => {
            alert(error?.response?.data?.message)
            console.log(error)
        },
    });


    const { mutate: remove } = useMutation({
        mutationKey: ["categories"],
        mutationFn: deleteSubAPI,
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

    function onSubmit(formData) {
        mutate(formData, {
            onSuccess: (data) => {
                alert(`Sub: ${data?.sub?.name} added successfully`)
                refetch();
            }
        });
    }

    //////delete

    function handleSearchChange(e) {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
    }

    const searched = (keyWord) => (cat) => cat?.name.toLowerCase().includes(keyWord)

    return (
        <>
            <div className='p-10'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full '>
                    <div className='font-bold text-lg md:text-2xl'>Add SubCategory</div>
                    <input
                        type="text"
                        className='border-b-2 border-orange-400 focus:outline-none focus:border-gray-600'
                        {...register("name")}
                        placeholder='Name'
                    />

                    <select id="parent" {...register("parent", { required: "Please select an option" })} className='outline-orange-400 focus:bg-orange-400 p-3'>
                        {cats?.categories?.map((cat) => { return <option value={cat?._id} className='bg-orange-400 hover:text-red-600'>{cat?.name}</option> })}


                    </select>


                    <button type='submit' className='p-1 bg-orange-400 hover:bg-orange-600 text-white duration-300 rounded-md my-5 w-1/4'>
                        {!isMutating ? "save..." : "saving"}
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
                    {data?.subs?.filter(searched(keyWord))?.map((sub, index) => {
                        return <div key={index} >
                            <div className='px-2 py-4 my-2 w-full flex justify-between items-center bg-orange-100  '>
                                <span>{sub?.name}</span>
                                <span>{sub?.slug}</span>
                                <div className='flex gap-5'>
                                    <button onClick={() => ("/updateCtegory")}><AiFillEdit color="red" /></button>
                                    <button onClick={() => handleDelete(sub?._id)}><AiFillDelete color="orange" /></button>
                                </div>

                            </div>

                        </div>
                    })}
                </div>

            </div>
        </>
    )
}
