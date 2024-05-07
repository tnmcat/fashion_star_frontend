import React, { useState, useEffect } from "react";
import { logoDearman } from "../assets";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

function Registration() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successNotify, setSuccessNotify] = useState("");
  const navigate = useNavigate();
  const REGEX = {
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  useEffect(() => {
    // Lấy token từ cookie
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("resetPasswordToken"));

    if (cookieString) {
      const token = cookieString.split("=")[1];
      setToken(token);
    }
  }, []);

  const [token, setToken] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
  };

  const handleValidate = () => {
    let errors = {};
    if (!password) {
      errors.password = "Required";
    } else if (!REGEX.password.test(password)) {
      errors.password =
        "Password must be at least 8 characters long, containing at least one number and one letter";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5454/api/register/reset-password?token=${token}`,
        {
          newPassword: password,
        }
      );

      if (response.data === "Password reset successfully") {
        setSuccessNotify("Password updated successfully!");
        setTimeout(() => {
          navigate("/signin"); // Redirect to signin page after successful reset
        }, 3000);
      } else {
        setSuccessNotify("");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-bodyFont">
      <div className="w-full bg-gray-100 pb-10">
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {({ errors, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto px-4">
              <div className="bg-gray-100 border border-gray-200 rounded-md p-6">
                <h2 className="text-3xl font-medium mb-4">Change Password</h2>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      onChange={handleChange}
                      value={password}
                      placeholder="8 characters, one number, one letter"
                      className="w-full py-1 border border-gray-300 px-2 rounded-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100"
                      type="password"
                    />
                    {errors.password && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                        <span className="italic font-bold text-base">!</span>
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={confirmPassword}
                      className="w-full py-1 border border-gray-300 px-2 rounded-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-inset focus:ring-indigo-600 duration-100"
                      type="password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                        <span className="italic font-bold text-base">!</span>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 duration-100"
                  >
                    Change password
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
                      <div>
                        <motion.p
                          initial={{
                            y: 10,
                            opacity: 0,
                          }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="text-base font-semibold text-green-500 border border-green-500 px-2 text-center"
                        >
                        </motion.p>
                      </div>
                      <div>
                        <motion.p
                          initial={{
                            y: 10,
                            opacity: 0,
                          }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="text-xs font-semibold text-green-500 border border-green-500 px-2 text-center mt-2"
                        >
                          {successNotify}
                        </motion.p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-black leading-4 mt-4">
                  By creating an account, you agree to Fashion Star{" "}
                  <span className="text-indigo-600">Conditions of Use</span> and{" "}
                  <span className="text-indigo-600">Private Notice.</span>
                </p>
                <div>
                  <p className="text-xs text-black">
                    Remember your Password?{" "}
                    <Link
                      to="/signin"
                      className="text-indigo-600 hover:text-orange-600 hover:underline underline-offset-1 duration-100"
                    >
                      Sign in <ArrowRightIcon className="inline-block" />
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 2024-2025 FashionStar, Project 04
        </p>
      </div>
    </div>
  );
}

export default Registration;