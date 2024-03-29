import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import closeIcon from "../assets/closeicon.png";
import moment from "moment";
import { useFormik } from "formik";

const UpdateRace = () => {
    const { raceId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            race: "",
            title: "",
            timeOfCompletion: {
                hours: "",
                minutes: "",
            },
            location: {
                city: "",
                state: "",
            },
            date: "",
            description: "",
        },
        validationSchema: Yup.object({
            race: Yup.string().required("Race is required"),
            title: Yup.string().required("Title is required"),
            timeOfCompletion: Yup.object({
                hours: Yup.number()
                    .integer("Hours must be an integer")
                    .required("Hours is required"),
                minutes: Yup.number()
                    .integer("Minutes must be an integer")
                    .required("Minutes is required"),
            }),
            location: Yup.object({
                city: Yup.string(),
                state: Yup.string(),
            }),
            date: Yup.date(),
            description: Yup.string(),
        }),
        onSubmit: async (values) => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");

                await axios.patch(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/races/${raceId}`,
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );

                toast.success("Your race was successfully updated!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                navigate("/calendar");
            } catch (error) {
                toast.error("Error updating race. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.error("Error updating race:", error);
            }
        },
    });

    const fetchRaceDetails = async () => {
        try {
            const jwtToken = localStorage.getItem("jwtToken");

            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/v1/races/${raceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            const raceDetails = response.data.race;

            if (raceDetails) {
                const formattedDate = moment
                    .utc(raceDetails.date)
                    .format("YYYY-MM-DD");

                formik.setValues({
                    race: raceDetails.race,
                    title: raceDetails.title,
                    timeOfCompletion: {
                        hours: raceDetails.timeOfCompletion
                            ? raceDetails.timeOfCompletion.hours
                            : "",
                        minutes: raceDetails.timeOfCompletion
                            ? raceDetails.timeOfCompletion.minutes
                            : "",
                    },
                    location: {
                        city: raceDetails.location
                            ? raceDetails.location.city
                            : "",
                        state: raceDetails.location
                            ? raceDetails.location.state
                            : "",
                    },
                    date: formattedDate,
                    description: raceDetails.description,
                });

                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching race details:", error);
        }
    };

    useEffect(() => {
        fetchRaceDetails();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }


    const handleClose = () => {
        navigate("/calendar");
    };

    return (
        <div className="bg-gradient-to-b from-custom-color to-blue-500 min-h-screen flex items-start justify-center">
            <div className="bg-gradient-to-t from-custom-color to-custom-color3 p-8 rounded-xl shadow-md max-w-md w-full">
                <div className="flex justify-end">
                    <button
                        onClick={handleClose}
                        className="text-white text-2xl cursor-pointer flex flex-row-reverse"
                    >
                        <img
                            src={closeIcon}
                            alt="close icon"
                            className="text-white text-2xl w-8 h-8"
                        />
                    </button>
                </div>
                <h2 className="text-xl font-bold text-white mb-8 text-center font-nunito">
                    Update your race
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    {/* Race */}
                    <div className="mb-4">
                        <label
                            className="block text-white mb-1 text-md font-nunito"
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
                            className="form-input pl-3 w-full h-10 mb-3 rounded-md"
                        >
                            <option value="" disabled></option>
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

                    {/* Title*/}
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-1 text-md font-nunito"
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
                            className={`form-input w-full pl-3 h-10 mb-3 rounded-md ${
                                formik.touched.title && formik.errors.title
                                    ? "border-red-500"
                                    : ""
                            }`}
                        />
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.title}
                            </p>
                        )}
                    </div>

                    {/* Performance Time of Completion */}
                    <div className="mb-4 flex">
                        <div className="mr-4">
                            <label
                                className="block  text-white mb-1 text-md font-nunito"
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
                                className="block  text-white mb-1 text-md font-nunito"
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
                            />
                            {formik.touched.timeOfCompletion?.minutes &&
                                formik.errors.timeOfCompletion?.minutes && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {formik.errors.timeOfCompletion.minutes}
                                    </p>
                                )}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-4 flex">
                        <div className="mr-4">
                            <label
                                className="block  text-white mb-1 text-md font-nunito"
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
                                className={`form-input w-full pl-3 h-10 mb-3 rounded-md ${
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
                                className="block text-white mb-1 text-md font-nunito"
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

                    {/* Date */}
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-1 text-md font-nunito"
                            htmlFor="date"
                        >
                            Date of your race
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date}
                            className="form-input w-full pl-3 pr-3 h-10 mb-3 rounded-md"
                        />
                        {formik.touched.date && formik.errors.date && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.date}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block  text-white mb-1 text-md font-nunito"
                            htmlFor="description"
                        >
                            Notes
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            className="form-input pl-3 pt-2 w-full h-32 mb-1 rounded-md"
                        ></textarea>
                        {formik.touched.description &&
                            formik.errors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formik.errors.description}
                                </p>
                            )}
                    </div>

                    {/* Submit  */}
                    <button
                        type="submit"
                        className="bg-9584bb text-white py-4 px-10 rounded-md font-nunito hover:opacity-55 mt-3 text-xl"
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

export default UpdateRace;
