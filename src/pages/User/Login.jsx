import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from "react-hook-form"
import { loginAPI } from '../../Api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProfile, updateStatus } from '../../redux/userSlice';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFrontendSchema } from '@/validation/userFrontendSchema';
import { toast } from 'react-toastify';




export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginFrontendSchema),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationKey: ["user"],
        mutationFn: loginAPI,
        onSuccess: (data) => {
            console.log("React Query Data", data?.name)



        },
        onError: (error) => {
            alert(error?.response?.data?.message)
            console.log(error)
        },
    });

    function onSubmit(formData) {
        console.log("Form Data", formData)
        // mutate(formData)

        mutate(formData, {
            onSuccess: (data) => {
                console.log(data?.user?.isAdmin);
                toast.succes("Wellcome to PulseTech")
                dispatch(updateProfile(data?.user));
                dispatch(updateStatus("authenticated"));

                if (data?.user?.isAdmin) {
                    navigate("/admin/dash");
                } else {
                    navigate("/user/profile");
                }
            }
        });


    }
    return (
        <div className='flex justify-center items-center my-5 '>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <h1 className='py-5 font-bold text-2xl'>Login</h1>

                <input
                    type="email"
                    className='text-sm p-2 w-full border-gray-400 focus:outline-none border-b-2 focus:border-teal-500 rounded-lg'
                    placeholder='email' {...register("email")}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                <input
                    type="password"
                    className='p-2 w-full border-gray-400 focus:outline-none border-b-2 focus:border-teal-500 rounded-lg'
                    placeholder='password' {...register("password")}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                <button type='submit' className='p-1 bg-orange-400 hover:bg-orange-400/50 text-white duration-300 rounded-md w-full my-5'>
                    {isPending ? "wait..." : "submit"}
                </button>

                <div className='text-center'>Dont have an account!
                    <Link to="/register" className='text-gray-700 font-bold p-3'>
                        Register
                    </Link>
                </div>

            </form>

        </div>
    )
}
