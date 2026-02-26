import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from "react-hook-form"
import { registerAPI } from '../Api/userApi';
import { Link, useNavigate } from 'react-router-dom';


import { zodResolver } from "@hookform/resolvers/zod";
import { registerFrontendSchema } from '@/validation/userFrontendSchema';




export const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerFrontendSchema),
    });

    const { mutate, isMutating } = useMutation({
        mutationKey: ["user"],
        mutationFn: registerAPI,
        onSuccess: () => { alert("Registered") },
        onError: (error) => {
            alert(error?.response?.data?.message)
            console.log(error)
        },
    });

    function onSubmit(formData) {
        console.log("Form Data", formData)
        mutate(formData, {
            onSuccess: (data) => {
                console.log(data?.name);
                navigate("/login");
            }
        });


    }
    return (
        <div className='flex justify-center items-center my-5'>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-[40%]'>


                <h1 className='py-5 font-bold text-2xl'>Register</h1>

                <input
                    type="text"
                    className='bg-white text-sm p-2 w-full border-gray-400 focus:outline-none border-b-2 focus:border-teal-500 '
                    {...register("name")}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                <input
                    type="email"
                    className='bg-white text-sm p-2 w-full border-gray-400 focus:outline-none border-b-2 focus:border-teal-500 '
                    {...register("email")}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                <input
                    type="password"
                    className='bg-white text-sm p-2 w-full border-gray-400 focus:outline-none border-b-2 focus:border-teal-500 '
                    {...register("password")}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}


                <button type='submit' className='p-1 bg-orange-400 hover:bg-orange-400/50 text-white duration-300 rounded-md w-full my-5'>
                    {isMutating ? "Registering" : "submit"}
                </button>

                <div className='text-center'>Alredy have an account
                    <Link to="/login" className='text-gray-700 font-bold p-3'>
                        Login
                    </Link>
                </div>

            </form>

        </div>
    )
}
