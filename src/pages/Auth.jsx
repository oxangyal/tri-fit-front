import React, { useState } from "react";

import closeEyeIcon from "../assets/closedeye.png";
import openEyeIcon from "../assets/openeye.png";

// import { Link } from "react-router-dom";

const Auth = () => {
    const [activeTab, setActiveTab] = useState("login");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSwitchTab = (tab) => {
        setErrors({}); 
        setActiveTab(tab);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validationForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log(
                activeTab === "login" ? "Login data:" : "Registration data:",
                formData
            );
        } else {
            setErrors(validationErrors);
        }
    };

    const validationForm = () => {
        const validationErrors = {};

        if (
            activeTab === "signup" &&
            (!formData.name.trim() ||
                formData.name.trim().length < 2 ||
                formData.name.trim().length > 25)
        ) {
            validationErrors.name = "Name must be between 2 and 25 characters";
        }

        if (!formData.email.trim()) {
            validationErrors.email = "Email is required";
        } else if (!isValidEmail(formData.email)) {
            validationErrors.email = "Invalid email format";
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Password is required";
        } else if (
            activeTab === "signup" &&
            formData.password.trim().length < 5
        ) {
            validationErrors.password =
                "Password must be at least 5 characters";
        }

        if (
            activeTab === "signup" &&
            formData.password.trim() !== formData.confirmPassword.trim()
        ) {
            validationErrors.confirmPassword = "Passwords do not match";
        }

        return validationErrors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="bg-gradient-to-b from-custom-color to-blue-500 min-h-screen flex items-start justify-center">
            <div className="bg-gradient-to-t from-custom-color to-blue-500 p-8 rounded shadow-md max-w-md w-full">
                {/* login tab */}
                <div className="flex mb-4">
                    <div
                        className={`cursor-pointer py-2 px-4 ${
                            activeTab === "login"
                                ? "bg-white text-blue-500"
                                : "text-white"
                        } rounded-tl-md rounded-bl-md `}
                        onClick={() => handleSwitchTab("login")}
                    >
                        Login
                    </div>
                    {/* Signup tab */}
                    <div
                        className={`cursor-pointer py-2 px-4 ${
                            activeTab === "signup"
                                ? "bg-white text-blue-500"
                                : "text-white"
                        } rounded-tr-md rounded-br-md `}
                        onClick={() => handleSwitchTab("signup")}
                    >
                        Signup
                    </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-8 text-center font-nunito">
                    {activeTab === "login" ? "Login" : "Signup"}
                </h2>
                <form onSubmit={handleSubmit}>
                    {activeTab === "signup" && (
                        <div className="mb-4">
                            <label
                                className="block font-bold text-white  mb-2 text-xl font-nunito"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                value={formData.name}
                                className={`form-input w-full h-10  mb-5 rounded-md ${
                                    errors.name ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            className="block font-bold text-white  mb-2 text-xl font-nunito"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            value={formData.email}
                            className={`form-input w-full h-10  mb-5 rounded-md ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label
                            className="block font-bold text-white  mb-2 text-xl font-nunito"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            onChange={handleChange}
                            value={formData.password}
                            className={`form-input w-full h-10 mb-5 rounded-md ${
                                errors.password ? "border-red-500" : ""
                            }`}
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-2 pt-4 flex items-center cursor-pointer"
                            onClick={handleTogglePassword}
                        >
                            <img
                                src={showPassword ? closeEyeIcon : openEyeIcon}
                                alt={
                                    showPassword
                                        ? "Close Eye Icon"
                                        : "Open Eye Icon"
                                }
                                className="w-6 h-6 text-gray-500 hover:text-gray-700"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {activeTab === "signup" && (
                        <div className="mb-4">
                            <label
                                className="block font-bold text-white  mb-2 text-xl font-nunito"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                                className={`form-input w-full h-10  rounded-md${
                                    errors.confirmPassword
                                        ? "border-red-500"
                                        : ""
                                }`}
                                required
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="mb-4 text-center">
                        {activeTab === "login" ? (
                            <>
                                <br />
                                <span className="text-white hover:underline cursor-pointer">
                                    Don't have an account?{" "}
                                </span>
                                <span
                                    className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => handleSwitchTab("signup")}
                                >
                                    click here
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="text-white hover:underline cursor-pointer">
                                    Already have an account?{" "}
                                </span>
                                <span
                                    className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => handleSwitchTab("login")}
                                >
                                    click here
                                </span>
                            </>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-4 px-10 rounded font-nunito hover:opacity-55 mt-4 text-xl"
                    >
                        {activeTab === "login" ? "Login" : "Signup"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
