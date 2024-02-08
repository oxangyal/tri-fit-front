import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import closeIcon from "../assets/closeicon.png";
import moment from "moment";
import { useFormik } from "formik";

const UpdateWorkout = () => {
    const { workoutId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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
            duration: Yup.string().required("Duration is required"),
            intensity: Yup.string(),
            indoor: Yup.boolean(),
            outdoor: Yup.boolean(),
            date: Yup.date(),
            description: Yup.string(),
        }),
        onSubmit: async (values) => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");
                await axios.patch(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/workouts/${workoutId}`,
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );
console.log((values));
                toast.success("Your workout was successfully updated!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                navigate("/calendar");
            } catch (error) {
                toast.error("Error updating workout. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.error("Error updating workout:", error);
            }
        },
    });

    const fetchWorkoutDetails = async () => {
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/workouts/${workoutId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            const workoutDetails = response.data.workout;

            if (workoutDetails) {
                const formattedDate = moment
                    .utc(workoutDetails.date)
                    .format("YYYY-MM-DD");
                
                formik.setValues({
                    workoutType: workoutDetails.workoutType,
                    duration: workoutDetails.duration,
                    intensity: workoutDetails.intensity,
                    indoor: workoutDetails.indoor,
                    outdoor: !workoutDetails.indoor,
                    date: formattedDate,
                    description: workoutDetails.description,
                });

                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching workout details:", error);
        }
    };

    useEffect(() => {
        fetchWorkoutDetails();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }


    const handleClose = () => {
        navigate("/calendar");
    };

    return (
        <div className="bg-gradient-to-b from-custom-color to-blue-500 min-h-screen flex items-start justify-center">
            <div className="bg-gradient-to-t from-custom-color to-custom-color2 p-8 rounded-xl shadow-md max-w-md w-full">
                <div className="flex justify-end">
                    <button
                        onClick={handleClose}
                        className="text-white text-2xl cursor-pointer"
                    >
                        <img
                            src={closeIcon}
                            alt="close icon"
                            className="text-white text-2xl w-8 h-8"
                        />
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <h2 className="text-xl font-bold text-white mb-8 text-center font-nunito">
                        Update your workout
                    </h2>
                    {/* Workout */}
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
                        >
                            <option value="" disabled></option>
                            <option value="swim">Swim</option>
                            <option value="run">Run</option>
                            <option value="cycle">Cycle</option>
                            <option value="strength">Strength</option>
                            <option value="yoga">Yoga</option>
                            <option value="stretch">Stretch</option>
                        </select>
                        {formik.touched.workoutType &&
                            formik.errors.workoutType && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors.workoutType}
                                </p>
                            )}
                    </div>

                    {/* Duration */}
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
                        />
                        {formik.touched.duration && formik.errors.duration && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.duration}
                            </p>
                        )}
                    </div>

                    {/* Intensity */}
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
                        >
                            <option value="" disabled></option>
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

                    {/* Indoor/Outdoor */}
                    <div className="mb-4">
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

                    {/* Date */}
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

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-41b1ab text-white py-4 px-10 rounded-md font-nunito hover:opacity-55 mt-10 text-xl"
                    >
                        Update
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

export default UpdateWorkout;
