import React, {useState} from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {Link, useNavigate} from "react-router-dom";
import {Formik} from "formik";
import {motion} from "framer-motion";
import axios from "axios";
import {RotatingLines} from "react-loader-spinner";
import {logoSeller} from "../assets";

function SellerRegistration() {
    const [form, setForm] = useState({});
    const [registerData, setRegisterData] = useState({});
    const [registeredEmail, setRegisteredEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successNotify, setSuccessNotify] = useState("");
    const navigate = useNavigate();

    const REGEX = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

        if (event.target.name !== "cpassword") {
            setRegisterData({
                ...registerData,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleValidate = () => {
        let errors = {};

        if (!form.sellerName) {
            errors.sellerName = "Required";
        }

        if (!form.email) {
            errors.email = "Required";
        } else if (!REGEX.email.test(form.email)) {
            errors.email = "Invalid email";
        }

        if (!form.password) {
            errors.password = "Required";
        } else if (!REGEX.password.test(form.password)) {
            errors.password =
                "Password must be minium 8 characters, at least one number, one letter";
        }

        if (form.cpassword !== form.password) {
            errors.cpassword = "Password does not match";
        }
        return errors;
    };

    const handleSubmit = async () => {
        setLoading(true);
        setRegisteredEmail(false);
        await axios
            .post("http://localhost:5454/api/register/seller", registerData)
            .then(() => {
                setLoading(false);
                setSuccessNotify("Account created successfully");
                setTimeout(() => {
                    navigate("/sellercentral/signin");
                }, 2500);
            })
            .catch((err) => {
                setRegisteredEmail(true);
                setLoading(false);
                throw err;
            });
    };

    return (
        <div className="w-full font-bodyFont">
            <div className="w-full bg-gray-100 pb-10">
                <Formik
                    initialValues={form}
                    validate={handleValidate}
                    onSubmit={handleSubmit}
                >
                    {({errors, handleSubmit}) => (
                        <form
                            onSubmit={handleSubmit}
                            className="w-[350px] mx-auto flex flex-col items-center"
                        >
                            <img
                                className="w-[168px]"
                                src={logoSeller}
                                alt="logo"
                            />

                            <div className="w-full border border-zinc-200 bg-gray-100 rounded-md p-6">
                                <h2 className="font-titleFont text-3xl font-medium mb-4">
                                    Create account
                                </h2>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium">
                                            Your seller name
                                        </p>
                                        <input
                                            id="sellerNameInput"
                                            maxLength="50"
                                            placeholder="Seller name"
                                            onChange={handleChange}
                                            name="sellerName"
                                            value={form.sellerName || ""}
                                            className="w-full normal-case py-1 bordder border-zinc-400
                    px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5]
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100
                    "
                                            type="text"
                                        ></input>
                                        {errors.sellerName && (
                                            <p
                                                className="text-red-600 text-xs font-semibold tracking-wide
                    flex items-center gap-2 -mt-1.5"
                                            >
                                                <span className="italic font-titleFont font-extrabold text-base">
                                                    !
                                                </span>
                                                {errors.sellerName}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium">
                                            Email
                                        </p>
                                        <input
                                            name="email"
                                            onChange={handleChange}
                                            value={form.email || ""}
                                            className="w-full normal-case py-1 bordder border-zinc-400
                    px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5]
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100
                    "
                                            type="text"
                                        ></input>
                                        {errors.email && (
                                            <p
                                                className="text-red-600 text-xs font-semibold tracking-wide
                    flex items-center gap-2 -mt-1.5"
                                            >
                                                <span className="italic font-titleFont font-extrabold text-base">
                                                    !
                                                </span>
                                                {errors.email}
                                            </p>
                                        )}
                                        {registeredEmail && (
                                            <p
                                                className="text-red-600 text-xs font-semibold tracking-wide
                    flex items-center gap-2 -mt-1.5"
                                            >
                                                <span className="italic font-titleFont font-extrabold text-base">
                                                    !
                                                </span>
                                                Email has already been
                                                registered
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium">
                                            Password
                                        </p>
                                        <input
                                            name="password"
                                            onChange={handleChange}
                                            value={form.password || ""}
                                            placeholder="8 characters, one number, one letter"
                                            className="w-full normal-case py-1 border border-zinc-400
                    px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5]
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100
                    "
                                            type="password"
                                        ></input>
                                        {errors.password && (
                                            <p
                                                className="text-red-600 text-xs font-semibold tracking-wide
                    flex items-center gap-2 -mt-1.5"
                                            >
                                                <span className="italic font-titleFont font-extrabold text-base">
                                                    !
                                                </span>
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium">
                                            Re-enter Password
                                        </p>
                                        <input
                                            name="cpassword"
                                            onChange={handleChange}
                                            value={form.cpassword || ""}
                                            className="w-full normal-case py-1 bordder border-zinc-400
                    px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5]
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100
                    "
                                            type="password"
                                        ></input>
                                        {errors.cpassword && (
                                            <p
                                                className="text-red-600 text-xs font-semibold tracking-wide
                    flex items-center gap-2 -mt-1.5"
                                            >
                                                <span className="italic font-titleFont font-extrabold text-base">
                                                    !
                                                </span>
                                                {errors.cpassword}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 
                                        py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500
                                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                          focus-visible:outline-indigo-600"
                                    >
                                        Continue
                                    </button>
                                    {loading && (
                                        <div className="flex justify-center">
                                            <RotatingLines
                                                strokeColor="#febd69"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="50"
                                                visible={true}
                                            />
                                        </div>
                                    )}
                                    {successNotify && (
                                        <div>
                                            <motion.p
                                                initial={{y: 10, opacity: 0}}
                                                animate={{y: 0, opacity: 1}}
                                                transition={{duration: 0.5}}
                                                className="text-base font-titleFont font-semibold text-green-500
                        border-[1px] border-green-500 px-2 text-center"
                                            >
                                                {successNotify}
                                            </motion.p>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-black leading-4 mt-4">
                                    By creating an account, you agree to
                                    FashionStar's{" "}
                                    <span className="text-indigo-600">
                                        Conditions of Use{" "}
                                    </span>
                                    and{" "}
                                    <span className="text-indigo-600">
                                        Private Notice.
                                    </span>
                                </p>
                                <div>
                                    <p className="text-xs text-black">
                                        Already have an account?{" "}
                                        <Link to="/sellercentral/signin">
                                            <span
                                                className="text-xs text-indigo-600 hover:text-orange-600
            hover:underline underline-offset-1 cursor-pointer duration-100"
                                            >
                                                Sign in{" "}
                                                <span>
                                                    <ArrowRightIcon />
                                                </span>
                                            </span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
                <p className="text-xs text-gray-600">
                    © 2024-2025 Fashion Star - Group 4.
                </p>
            </div>
        </div>
    );
}

export default SellerRegistration;
