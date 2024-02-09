import * as Yup from "yup";

import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import closeEyeIcon from "../assets/closedeye.png";
import openEyeIcon from "../assets/openeye.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";

const Register = () => {
    const navigate = useNavigate();
    const { setUserData } = useContext(userDataContext);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required")
                .min(2, "Name must be at least 2 characters")
                .max(25, "Name must be at most 25 characters"),
            email: Yup.string()
                .required("Email is required")
                .email("Invalid email format"),
            password: Yup.string()
                .required("Password is required")
                .min(5, "Password must be at least 5 characters"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords do not match")
                .required("Confirm Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`,
                    values
                );

                const { data, status } = response;

                if (status !== 201) {
                    throw new Error("Registration failed");
                }

                const { token, user } = data;
                const { userId } = user;

                // Save token and userId to localStorage
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("userId", userId);
                
                setUserData({ ...data, isLoggedIn: true });
                
                toast.success("Registration successful! You can now login.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                console.log("Registration successful:", data);
                navigate("/calendar");
            } catch (error) {
                console.error("Error:", error);
                toast.error(
                    "Registration failed. Please check your information and try again."
                );
            }
        },
    });

    const handleTogglePassword = () => {
        formik.setFieldValue("showPassword", !formik.values.showPassword);
    };

    return (
        <>
            {/* // <div className="bg-gradient-to-b from-custom-color to-blue-500 min-h-screen flex items-start justify-center"> */}
            <div className="bg-gradient-to-t from-custom-color to-blue-500 p-8 rounded-b-lg shadow-2xl max-w-md w-full">
                <h2 className="text-xl font-bold text-white mb-8 text-center font-nunito">
                    Signup
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-md font-nunito"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className={`form-input w-full h-10 pl-3 mb-5 rounded-md ${
                                formik.errors.name && formik.touched.name
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.name}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-white mb-2 text-md font-nunito"
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
                            className={`form-input w-full h-10  pl-3 mb-5 rounded-md ${
                                formik.errors.email && formik.touched.email
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                        />
                        {formik.touched.email && formik.errors.email && (
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
                            className={`form-input w-full h-10 pl-3 mb-5 rounded-md ${
                                formik.errors.password &&
                                formik.touched.password
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-2 pt-4 flex items-center cursor-pointer"
                            onClick={handleTogglePassword}
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
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-white mb-2 text-md font-nunito"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            className={`form-input w-full h-10 pl-3 rounded-md${
                                formik.errors.confirmPassword &&
                                formik.touched.confirmPassword
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                        />
                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                    </div>

                    {/* <div className="mb-4 text-center text-white">
                        Have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline"
                        >
                            click here
                        </Link>
                    </div> */}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-4 px-10 rounded-xl font-nunito hover:opacity-55 mt-10 text-xl"
                    >
                        Signup
                    </button>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Register;
