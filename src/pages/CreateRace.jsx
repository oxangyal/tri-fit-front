import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";

import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const CreateRace = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            race: "",
            title: "",
            timeOfCompletion: {
                hours: 0,
                minutes: 0,
            },
            date: "",
            location: {
                city: "",
                state: "",
            },
            description: "",
        },
        validationSchema: Yup.object({
            race: Yup.string().required("Race is required"),
            title: Yup.string().required("Title is required"),
            timeOfCompletion: Yup.object().shape({
                hours: Yup.number().min(0),
                minutes: Yup.number().min(0).max(59),
            }),
            date: Yup.date().required("Date is required"),
            location: Yup.object().shape({
                city: Yup.string(),
                state: Yup.string(),
            }),
            description: Yup.string(),
        }),
        onSubmit: async (values) => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");
                const response = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/races`,
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );

                console.log(response.data.race);
                toast.success("Your race was successfully created!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                await new Promise((resolve) => setTimeout(resolve, 1500));

                navigate("/calendar");
            } catch (error) {
                toast.error("Error creating race. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.error("Error creating race:", error);
            }
        },
    });
    
    return (
        <div className="bg-gradient-to-b from-custom-color to-blue-500 min-h-screen flex items-start justify-center">
            <div className="bg-gradient-to-t from-custom-color to-blue-500 p-8 rounded-xl shadow-md max-w-md w-full">
                <h2 className="text-xl font-bold text-white mb-8 text-center font-nunito">
                    Create Race
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-lg font-nunito"
                            htmlFor="race"
                        >
                            Race
                        </label>
                        <select
                            name="race"
                            id="race"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.race}
                            className="form-input pl-3 w-full h-10 mb-5 rounded-md"
                            required
                        >
                            <option value="" disabled>
                                Select Race
                            </option>
                            <option value="sprint">Sprint</option>
                            <option value="olympic">Olympic</option>
                            <option value="duathlon">Duathlon</option>
                            <option value="aquathon">Aquathon</option>
                            <option value="halfironman">Half Ironman</option>
                            <option value="fullironman">Full Ironman</option>
                            <option value="halfmarathon">Half Marathon</option>
                            <option value="fullmarathon">Full Marathon</option>
                        </select>
                        {formik.touched.race && formik.errors.race && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.race}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-lg font-nunito"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            className={`form-input w-full pl-3 h-10 mb-5 rounded-md ${
                                formik.touched.title && formik.errors.title
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                        />
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.title}
                            </p>
                        )}
                    </div>

                    <div className="mb-4 flex">
                        <div className="mr-4">
                            <label
                                className="block  text-white mb-2 text-lg font-nunito"
                                htmlFor="timeOfCompletion.hours"
                            >
                                Hours
                            </label>
                            <input
                                type="number"
                                name="timeOfCompletion.hours"
                                id="timeOfCompletion.hours"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.timeOfCompletion.hours}
                                className={`form-input w-full pl-3 h-10 mb-5 rounded-md ${
                                    formik.touched.timeOfCompletion?.hours &&
                                    formik.errors.timeOfCompletion?.hours
                                        ? "border-red-500"
                                        : ""
                                }`}
                                required
                            />
                            {formik.touched.timeOfCompletion?.hours &&
                                formik.errors.timeOfCompletion?.hours && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {formik.errors.timeOfCompletion.hours}
                                    </p>
                                )}
                        </div>
                        <div>
                            <label
                                className="block  text-white mb-2 text-lg font-nunito"
                                htmlFor="timeOfCompletion.minutes"
                            >
                                Minutes
                            </label>
                            <input
                                type="number"
                                name="timeOfCompletion.minutes"
                                id="timeOfCompletion.minutes"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.timeOfCompletion.minutes}
                                className={`form-input w-full pl-3 h-10 mb-5 rounded-md ${
                                    formik.touched.timeOfCompletion?.minutes &&
                                    formik.errors.timeOfCompletion?.minutes
                                        ? "border-red-500"
                                        : ""
                                }`}
                                required
                            />
                            {formik.touched.timeOfCompletion?.minutes &&
                                formik.errors.timeOfCompletion?.minutes && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {formik.errors.timeOfCompletion.minutes}
                                    </p>
                                )}
                        </div>
                    </div>

                    <div className="mb-4 flex">
                        <div className="mr-4">
                            <label
                                className="block  text-white mb-2 text-lg font-nunito"
                                htmlFor="location.city"
                            >
                                City
                            </label>
                            <input
                                type="text"
                                name="location.city"
                                id="location.city"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.location.city}
                                className={`form-input w-full pl-3 h-10 mb-5 rounded-md ${
                                    formik.touched.location?.city &&
                                    formik.errors.location?.city
                                        ? "border-red-500"
                                        : ""
                                }`}
                            />
                            {formik.touched.location?.city &&
                                formik.errors.location?.city && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {formik.errors.location.city}
                                    </p>
                                )}
                        </div>
                        <div>
                            <label
                                className="block  text-white mb-2 text-lg font-nunito"
                                htmlFor="location.state"
                            >
                                State
                            </label>
                            <input
                                type="text"
                                name="location.state"
                                id="location.state"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.location.state}
                                className={`form-input w-full pl-3 h-10 mb-5 rounded-md ${
                                    formik.touched.location?.state &&
                                    formik.errors.location?.state
                                        ? "border-red-500"
                                        : ""
                                }`}
                            />
                            {formik.touched.location?.state &&
                                formik.errors.location?.state && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {formik.errors.location.state}
                                    </p>
                                )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-lg font-nunito"
                            htmlFor="date"
                        >
                            Date of you race
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date}
                            className="form-input w-full pl-3 pr-3 h-10 mb-5 rounded-md"
                            required
                        />
                        {formik.touched.date && formik.errors.date && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.date}
                            </p>
                        )}
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-lg font-nunito"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        
                        <textarea
                            name="description"
                            id="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="form-input pl-3 pt-2 w-full h-32 mb-5 rounded-md"
                        ></textarea>
                        {formik.touched.description &&
                            formik.errors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors.description}
                                </p>
                            )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-4 px-10 rounded-md font-nunito hover:opacity-55 mt-10 text-xl"
                    >
                        Create
                    </button>
                </form>
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
            </div>
        </div>
    );
};

export default CreateRace;
