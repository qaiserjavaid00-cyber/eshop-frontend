import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { getAllCatsAPI } from '../Api/catApi';
import { getSingleSubAPI } from '../Api/subApi';
import { useState } from 'react';




export const FormExample = () => {
    const { register, handleSubmit } = useForm();
    const [parentId, setParentId] = useState("682df4e9654aa1a3e5cfb785");


    // fetch All Cats

    const { data: cats } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCatsAPI,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log("Error", error)
        }

    })

    ////Fetch SUBS

    // const { data: subs } = useQuery({
    //     queryKey: ["subs"],
    //     queryFn: getAllsubsAPI,
    //     onSuccess: (data) => {
    //         console.log(data)
    //     },
    //     onError: (error) => {
    //         console.log(error)
    //     }

    // })

    ////fetch single sub category based on ParentID

    const { data: sub } = useQuery({
        queryKey: ["subs", parentId],
        queryFn: () => getSingleSubAPI(parentId),
        onSuccess: (data) => {
            console.log(data)

        },
        onError: (error) => {
            console.log(error)
        }

    })

    console.log("Single Sub", sub)



    function handleChange(e) {
        register('category').onChange(e);
        console.log('Custom onChange handler:', e.target.value)
        setParentId(e.target.value)
        console.log("Parent ID", parentId)

    }

    function onSubmit(formData) {
        console.log(register())
    }

    return (
        <>
            <div>React Hook Form</div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full p-10 '>
                <div className='font-bold text-lg md:text-2xl'>Category and Subs</div>
                <select
                    id="category"
                    {...register("category", { required: "Please select an option" })}
                    onChange={handleChange}
                    className='outline-orange-400 focus:bg-orange-400 p-3'>
                    {cats?.categories?.map((cat) => { return <option value={cat?._id} className='bg-orange-400 hover:text-red-600'>{cat?.name}</option> })}
                </select>

                <select id="sub" {...register("sub", { required: "Please select an option" })} className='outline-orange-400 focus:bg-orange-400 p-3'>
                    {sub?.sub?.map((s) => { return <option value={s?._id} className='bg-orange-400 hover:text-red-600'>{s?.name}</option> })}
                </select>
                <button type='submit' className='p-1 bg-orange-400 hover:bg-orange-600 text-white duration-300 rounded-md my-5 w-1/4'>
                    Submit                    </button>
            </form>
            <div>Single sub {sub?.sub?.name}</div>
        </>
    )
}
