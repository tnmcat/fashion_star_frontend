import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
RegisterForm.propTypes = {
    onSubmit: PropTypes.func
};

function RegisterForm(props) {
    const schema = yup.object().shape({
        sellerName: yup.string().required('Please enter full name'),
        birthDay: yup.string().required('Please enter birthday'),
        phone: yup.string().required('Please enter phone'),
        email: yup.string().required('Please enter email').email('Please enter valid email'),
        password: yup.string().required('Please enter password').min(6, 'Password should be at least 6 characters'),
        retypePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    });
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmitHandler = async (value) => {
        console.log('register form', value);
        const { onSubmit } = props;
        //kiem tra component cha co goi onSubmit hay ko
        if (onSubmit) {
            await onSubmit(value)
        }
        //reset();
    }

    return (
        <div>
            <div className="w-full font-bodyFont">
                <div className="w-full bg-gray-100 pb-10">
                    <form
                        onSubmit={handleSubmit(onSubmitHandler)}
                        className="w-[350px] mx-auto flex flex-col items-center"
                    >
                        <img
                            className="w-[168px]"

                            alt="logo"
                        />
                        <div className="w-full bg-gray-100 border border-zinc-300 rounded-md p-6">
                            <h2 className="font-titleFont text-3xl font-medium mb-4">
                                Get started selling on FashionStar
                            </h2>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">Email</p>
                                    <input
                                        name="email"
                                        {...register("email")}
                                        className="w-full normal-case py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5] focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100"
                                        type="email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="italic font-titleFont font-extrabold text-base">!</span>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">Fullname</p>
                                    <input
                                        name="fullName"
                                        {...register("sellerName")}
                                        className="w-full normal-case py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5] focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100"
                                        type="text"
                                    />
                                    {errors.sellerName && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="italic font-titleFont font-extrabold text-base">!</span>
                                            {errors.sellerName.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">Birthday</p>
                                    <input
                                        name="birthDay"
                                        {...register("birthDay")}
                                        className="w-full normal-case py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5] focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100"
                                        type="text"
                                    />
                                    {errors.birthDay && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="italic font-titleFont font-extrabold text-base">!</span>
                                            {errors.birthDay.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">Phone</p>
                                    <input
                                        name="fullName"
                                        {...register("phone")}
                                        className="w-full normal-case py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5] focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100"
                                        type="text"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="italic font-titleFont font-extrabold text-base">!</span>
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">Password</p>
                                    <input
                                        name="password"
                                        {...register("password")}
                                        className="w-full normal-case py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5] focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100"
                                        type="password"
                                    />
                                    {errors.password && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="italic font-titleFont font-extrabold text-base">!</span>
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">Confirm Password</p>
                                    <input
                                        name="confirmPassword"
                                        {...register("confirmPassword")}
                                        className="w-full normal-case py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5] focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100"
                                        type="password"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                                            <span className="italic font-titleFont font-extrabold text-base">!</span>
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                                {/* Additional form fields and validation messages */}
                            </div>
                            <button
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit"
                            >
                                Continue
                            </button>
                            {/* Loading and success notifications */}
                        </div>
                    </form>
                </div>
                <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
                    <p className="text-xs text-gray-600">
                        © 2024-2025 FashionStar - Project Group 4.
                    </p>
                </div>
            </div>
        </div>

    );
}

export default RegisterForm;
