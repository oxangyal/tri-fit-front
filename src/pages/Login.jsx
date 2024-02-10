import * as Yup from "yup";

import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import closeEyeIcon from "../assets/closedeye.png";
import openEyeIcon from "../assets/openeye.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";

const Login = () => {
    const { setUserData } = useContext(userDataContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            showPassword: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
                    {
                        email: values.email,
                        password: values.password,
                    }
                );

                const { data, status } = response;

                if (status !== 200) {
                    throw new Error("Login failed");
                }

                const { token, user } = data;
                const { userId } = user;
                //UserContext populated
                setUserData({ ...data, isLoggedIn: true });

                // Save token and userId to localStorage
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("userId", userId);

                console.log("Login successful:", data);

                toast.success("You successfully logged in!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                // await new Promise((resolve) => setTimeout(resolve, 1000));

                navigate("/calendar");
            } catch (error) {
                console.error("Error:", error);

                if (error.response) {
                    console.error("Response status:", error.response.status);
                    toast.error(
                        `Login failed: ${error.response.data.message}`,
                        {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        }
                    );
                }
            }
        },
    });

    // if (userData.isLoggedIn) {
    //     navigate("/calendar");
    //     return null;
    // }
    return (
        <>
            <div className="bg-gradient-to-t from-custom-color to-blue-500 p-8 rounded-b-lg   shadow-md max-w-md w-full">
                <h2 className="text-xl font-bold text-white mb-8 text-center font-nunito">
                    Login
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-md font-nunito"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className={`form-input w-full h-10 mb-5 pl-3 rounded-md ${
                                formik.errors.email ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label
                            className="block text-white mb-2 text-md font-nunito"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type={
                                formik.values.showPassword ? "text" : "password"
                            }
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className={`form-input w-full h-10 mb-5 pl-3 rounded-md ${
                                formik.errors.password ? "border-red-500" : ""
                            }`}
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-2 pt-4 flex items-center cursor-pointer"
                            onClick={() =>
                                formik.setFieldValue(
                                    "showPassword",
                                    !formik.values.showPassword
                                )
                            }
                        >
                            <img
                                src={
                                    formik.values.showPassword
                                        ? closeEyeIcon
                                        : openEyeIcon
                                }
                                alt={
                                    formik.values.showPassword
                                        ? "Close Eye Icon"
                                        : "Open Eye Icon"
                                }
                                className="w-6 h-6 text-gray-500 hover:text-gray-700"
                            />
                        </div>
                        {formik.errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 text-center">
                        {/* <Link
                            to="/forgot-password"
                            className="text-blue-500 hover:underline"
                        >
                            Forgot Password?
                        </Link> */}
                    </div>
                    {/* <div className="mb-4 text-center text-white">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:underline"
                        >
                            click here
                        </Link>
                    </div> */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-4 px-10 rounded-xl font-nunito hover:opacity-55 mt-10 text-xl"
                    >
                        Login
                    </button>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Login;
