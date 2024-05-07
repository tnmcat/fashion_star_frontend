import React, { Fragment, useEffect, useRef, useState } from "react";
import { logoDearman } from "../assets";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../features/user/userSlice";
import jwt_decode from "jwt-decode";
import {
  addNewCartLine,
  resetCart,
  createSaveForLater,
  resetSaveForLater,
} from "../features/cart/cartSlice";
import { Box, Button, Dialog, Modal } from "@mui/material";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorNotify, setErrorNotify] = useState("");
  const [successNotify, setSuccessNotify] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const { products, empties } = useSelector((state) => state.cart);

  const handleValidate = () => {
    let errors = {};
    if (!form.email) {
      errors.email = "Required";
    }

    if (!form.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:5454/api/login", form)
      .then((res) => {
        setErrorNotify("");
        setLoading(false);
        window.localStorage.setItem("token", res.data);
        setSuccessNotify("Log in succesfully! Welcome back");
        dispatch(setUserInfo(jwt_decode(res.data).sub));
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorNotify("Invalid email or password");
        throw err;
      });
  };

  useEffect(() => {
    if (userInfo) {
      sendValuesInDatabase();
    }
  }, [userInfo]);

  const sendValuesInDatabase = () => {
    products.map((item) =>
      dispatch(
        addNewCartLine({
          id: "",
          quantity: item.quantity,
          cartId: userInfo.id,
          variantId: item.variantDto.id,
        })
      )
    );
    empties.map((item) =>
      dispatch(
        createSaveForLater({
          id: "",
          quantity: item.quantity,
          cartId: userInfo.id,
          variantId: item.variantDto.id,
        })
      )
    );
    dispatch(resetCart());
    dispatch(resetSaveForLater());
  };

  const [openPasswordReset, setOpenPasswordReset] = useState(false);

  const handleOpenPasswordReset = () => {
    setOpenPasswordReset(true);
  };

  const handleClosePasswordReset = () => {
    setOpenPasswordReset(false);
  };

  const handlePasswordResetSubmit = async (values) => {
    try {
      // Gửi yêu cầu đặt lại mật khẩu đến endpoint API
      const response = await axios.post(
        "http://localhost:5454/api/register/password-reset-request",
        values
      );
      console.log(response.data); // In ra dữ liệu trả về từ API (nếu cần)
      // Hiển thị modal thông báo
      setOpenPasswordReset(false);
      setSuccessNotify("Password reset email sent successfully!");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      setErrorNotify("Failed to send password reset email");
    }
  };

  return (
    <div className="w-full font-bodyFont">
      <div className="w-full bg-gray-100 pb-10">
        <Formik
          initialValues={form}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {({ errors, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="w-[350px] mx-auto flex flex-col items-center"
            >
              <Link to="/">
                <img className="w-36" src={logoDearman} alt="logo" />
              </Link>
              <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm border border-zinc-300 rounded-md p-6">
                <h2 className="font-titleFont text-3xl font-medium mb-4">
                  Sign in
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm font-medium leading-6 text-gray-900">
                      Email
                    </p>
                    <input
                      onChange={handleChange}
                      name="email"
                      placeholder=" Your email"
                      className="w-full normal-case py-1 bordder border-zinc-400
                    px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5]
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100
                    "
                      type="email"
                    ></input>
                    {errors.email && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                        <span className="italic font-titleFont font-extrabold text-base">
                          !
                        </span>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </p>
                    <input
                      onChange={handleChange}
                      name="password"
                      placeholder="Your password"
                      className="w-full normal-case py-1 bordder border-zinc-400
                    px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5]
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100
                    "
                      type="password"
                    ></input>
                    {errors.password && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                        <span className="italic font-titleFont font-extrabold text-base">
                          !
                        </span>
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {errorNotify && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {errorNotify}
                    </p>
                  )}
                  <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
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
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-base font-titleFont font-semibold text-green-500
                        border-[1px] border-green-500 px-2 text-center"
                      >
                        {successNotify}
                      </motion.p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-black leading-4 mt-4">
                  By Continuing, you agree to FashionStar's{" "}
                  <span className="text-indigo-600">Conditions of Use </span>
                  and{" "}
                  <span className="text-indigo-600">Private Notice.</span>
                </p>
                <Link
                  className="text-xs text-gray-600 mt-4 cursor-pointer group"
                  onClick={handleOpenPasswordReset}
                >
                  <ArrowRightIcon />
                  <span
                    className="font-semibold text-indigo-600 hover:text-indigo-500 group-hover:text-orange-700 group-hover:underline underline-offset-1 "
                    onClick={handleOpenPasswordReset}
                  >
                    Forgot Password?
                  </span>
                </Link>
              </div>
              <div className="w-full text-xs text-gray-600 mt-4 flex items-center">
                <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex mr-2"></span>
                <span className="w-1/3 text-center whitespace-nowrap">
                  New to FashionStar?
                </span>
                <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex ml-2"></span>
              </div>
              <Link className="w-full" to="/register">
                <button className="w-full py-1.5 px-2 mt-4 text-sm font-normal
              rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border
              border-zinc-400 focus-within:[#4F46E5]
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100">
                  Create your FashionStar account
                </button>
              </Link>
            </form>
          )}
        </Formik>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-indigo-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
          <p className="text-xs text-indigo-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className="text-xs text-indigo-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 2024-2025 Fashion Star - A New generation
        </p>
      </div>
      <Modal
        open={openPasswordReset}
        onClose={handleClosePasswordReset}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        className="m-60 p-15"
      >
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handlePasswordResetSubmit}
        >
          {({ handleChange, handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 p-2 border rounded-md border-zinc-300 bg-gray-100 ">
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </p>
                <input
                  onChange={handleChange}
                  name="email"
                  placeholder=" Your email"
                  className="w-full normal-case py-1 bordder border-zinc-400
                                px-2 text-base rounded-sm outline-none focus-within:border-[#4F46E5]
                                focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100"
                  type="email"
                ></input>
                {errors.email && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errors.email}
                  </p>
                )}
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit"
                >
                  New password
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

export default Signin;
