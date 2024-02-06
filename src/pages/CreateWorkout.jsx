import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";

import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const CreateWorkout = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            workoutType: "",
            duration: "",
            intensity: "",
            indoor: false,
            outdoor: false,
            date: "",
            description: "",
        },
        validationSchema: Yup.object({
            workoutType: Yup.string().required("Workout type is required"),
            duration: Yup.number()
                .required("Duration is required")
                .positive("Duration must be a positive number")
                .integer("Duration must be a whole number"),
            intensity: Yup.string(),
            indoor: Yup.boolean(),
            outdoor: Yup.boolean(),
            date: Yup.date()
                .min(new Date(), "Date cannot be in the past")
                .required("Date is required"),
            description: Yup.string(),
        }),
        onSubmit: async (values) => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");
                const response = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/workouts`,
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );

                console.log(response.data.workout);
                // const createdWorkout = response.data.workout;
                toast.success("Your workout was successfully created!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                await new Promise((resolve) => setTimeout(resolve, 1500));

                navigate("/workouts");
            } catch (error) {
                toast.error("Error creating workout. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.error("Error creating workout:", error);
            }
        },
    });

    return (
        <div className="bg-gradient-to-b from-custom-color to-blue-500 min-h-screen flex items-start justify-center">
            <div className="bg-gradient-to-t from-custom-color to-blue-500 p-8 rounded-xl shadow-md max-w-md w-full">
                <h2 className="text-xl font-bold text-white mb-8 text-center font-nunito">
                    Create Workout
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-lg font-nunito"
                            htmlFor="workoutType"
                        >
                            Workout
                        </label>
                        <select
                            name="workoutType"
                            id="workoutType"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.workoutType}
                            className="form-input pl-3 w-full h-10 mb-5 rounded-md"
                            required
                        >
                            <option value="" disabled>
                                Select Workout
                            </option>
                            <option value="swim">Swim</option>
                            <option value="run">Run</option>
                            <option value="cycle">Cycle</option>
                        </select>
                        {formik.touched.workoutType &&
                            formik.errors.workoutType && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors.workoutType}
                                </p>
                            )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-lg font-nunito"
                            htmlFor="duration"
                        >
                            Duration (minutes)
                        </label>
                        <input
                            type="text"
                            name="duration"
                            id="duration"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.duration}
                            className={`form-input w-full pl-3 h-10 mb-5 rounded-md ${
                                formik.touched.duration &&
                                formik.errors.duration
                                    ? "border-red-500"
                                    : ""
                            }`}
                            required
                        />
                        {formik.touched.duration && formik.errors.duration && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.duration}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-lg font-nunito"
                            htmlFor="intensity"
                        >
                            Intensity
                        </label>
                        <select
                            name="intensity"
                            id="intensity"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.intensity}
                            className="form-input pl-3 w-full h-10 mb-5 pr-3 rounded-md"
                            required
                        >
                            <option value="" disabled>
                                Select Intensity
                            </option>
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="high">High</option>
                        </select>
                        {formik.touched.intensity &&
                            formik.errors.intensity && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors.intensity}
                                </p>
                            )}
                    </div>
                    <div className="mb-4">
                        {/* <label
                            className="block font-bold text-white mb-2 text-xl font-nunito"
                            htmlFor="indoor"
                        >
                            Indoor
                        </label> */}
                        <input
                            type="radio"
                            id="indoor"
                            name="indoor"
                            checked={formik.values.indoor}
                            onChange={() =>
                                formik.setFieldValue("indoor", true)
                            }
                            onBlur={formik.handleBlur}
                        />
                        <label
                            htmlFor="indoor"
                            className="text-white pl-3 mr-4"
                        >
                            Indoor
                        </label>

                        <input
                            type="radio"
                            id="outdoor"
                            name="indoor"
                            checked={formik.values.outdoor}
                            onChange={() =>
                                formik.setFieldValue("outdoor", true)
                            }
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="outdoor" className="text-white pl-3">
                            Outdoor
                        </label>
                        {formik.touched.indoor && formik.errors.indoor && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.indoor}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-2 text-lg font-nunito"
                            htmlFor="date"
                        >
                            Date
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
                            required
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

export default CreateWorkout;
