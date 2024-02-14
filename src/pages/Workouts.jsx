import React, { useEffect, useState } from "react";

import axios from "axios";
import deleteIcon from "../assets/deleteicon.png";
import editIcon from "../assets/editicon.png";
import { useNavigate } from "react-router";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Workouts = () => {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortField, setSortField] = useState("date");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/workouts/upcoming?page=${currentPage}&sortField=${sortField}&sortOrder=${sortOrder}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );
                setWorkouts(response.data.workouts);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching workouts:", error);
                setError(
                    "An error occurred while fetching workouts. Please try again later."
                );
                setLoading(false);
            }
        };
        console.log(currentPage, sortOrder);

        fetchWorkouts();
    }, [currentPage, sortOrder, sortField]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                className={`text-blue px-3 py-2 rounded-md ${
                    currentPage === i
                        ? "bg-white text-blue"
                        : "bg-blue text-white"
                }`}
                onClick={() => handlePageClick(i)}
            >
                {i}
            </button>
        );
    }
    return pages;
};


    const handleSort = (field) => {
        console.log("handleSort: field: " + field);
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            console.log("handleSort: change order: " + sortOrder);
        } else {
            setSortField(field);
            setSortOrder("asc");
            console.log(
                "handleSort: change field: " +
                    sortField +
                    ", order: " +
                    sortOrder
            );
        }
        setCurrentPage(1);
    };

    const handleDelete = async (workout) => {
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            const workoutId = workout._id;

            await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/api/v1/workouts/${workoutId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            setWorkouts((prevWorkouts) =>
                prevWorkouts.filter((w) => w._id !== workoutId)
            );

            if (workouts.length === 1) {
                const newPage = currentPage > 1 ? currentPage - 1 : 1;
                setCurrentPage(newPage);
            }
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    const handleUpdate = (workout) => {
        navigate(`/workouts/${workout._id}`);
    };

    const renderWorkouts = () => {
        return workouts.map((workout) => (
            <div
                key={workout._id}
                className="flex items-center justify-between border-b border-gray-200 p-4"
            >
                <div className="lg:w-96 md:w-52 sm:w-28">
                    <p className="text-sm text-white">
                        {formatDate(workout.date)}
                    </p>
                    <p className="text-md text-white font-semibold">
                        {workout.workoutType.charAt(0).toUpperCase() +
                            workout.workoutType.slice(1)}
                    </p>
                    <div className="w-36">
                        <p className="text-sm text-white mr-2">
                            {workout.duration} minutes
                        </p>
                    </div>
                    <p className="text-sm text-white mr-2">
                        {workout.intensity.charAt(0).toUpperCase() +
                            workout.intensity.slice(1)}
                    </p>

                    <p className="text-sm text-white mr-2 ">
                        {workout.indoor ? "Indoor" : "Outdoor"}
                    </p>
                    <p className="text-sm text-white">{workout.description}</p>
                </div>
                <div className="flex gap-1 pl-2">
                    {/* Edit and Delete icons */}
                    <img
                        src={editIcon}
                        alt="Edit"
                        className="cursor-pointer w-4 h-4"
                        onClick={() => handleUpdate(workout)}
                    />
                    <img
                        src={deleteIcon}
                        alt="Delete"
                        className="cursor-pointer w-4 h-4"
                        onClick={() => handleDelete(workout)}
                    />
                </div>
            </div>
        ));
    };
    return (
        <div className="min-h-screen flex items-start justify-center" >
            <div className="w-96 mx-auto p-4" >
                <div className="flex justify-center gap-5 items-center mb-4">
                    {/* Button to sort workout by upcoming date */}
                    <button
                        className="bg-blue-500 text-white px-4 sm:text-sm:px-0 md:text-md lg:text-lg py-2 rounded-md"
                        onClick={() => handleSort("date")}
                    >
                        Sort by Date
                    </button>
                    {/* Button to sort workouts by duration */}
                    <button
                        className="bg-blue-500 text-white px-6 py-2 sm:text-sm:px-0 md:text-md lg:text-lg rounded-md"
                        onClick={() => handleSort("duration")}
                    >
                        Sort by Duration
                    </button>
                </div>
                {/* Render workouts */}
                {loading ? (
                    <div className="text-white">Loading...</div>
                ) : error ? (
                    <div className="text-white">{error}</div>
                ) : (
                    <div>
                        {renderWorkouts()}
                        <div className="flex justify-center mt-4">
                            {renderPagination()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Workouts;
