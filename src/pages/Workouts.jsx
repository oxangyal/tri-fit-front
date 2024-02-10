import React, { useEffect, useState } from "react";

import axios from "axios";
import deleteIcon from "../assets/deleteicon.png";
import editIcon from "../assets/editicon.png";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Workouts = () => {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");
    const workoutsPerPage = 2;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/workouts`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );
                setWorkouts(response.data.workouts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching workouts:", error);
                setError(
                    "An error occurred while fetching workouts. Please try again later."
                );
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);


    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-white">{error}</div>;

    
    const indexOfLastWorkout = currentPage * workoutsPerPage;
    const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
    const currentWorkouts = workouts.slice(
        indexOfFirstWorkout,
        indexOfLastWorkout
    );

    const handleSort = (field) => {
        const sortedWorkouts = [...workouts];
        sortedWorkouts.sort((a, b) => {
            if (sortOrder === "asc") {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });

        setWorkouts(sortedWorkouts);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };



const handleDelete = async (workout) => {
    try {
        const jwtToken = localStorage.getItem("jwtToken");
        const workoutId = workout._id;
        console.log(workout);
        console.log(workoutId);
        await axios.delete(
            `${process.env.REACT_APP_BASE_URL}/api/v1/workouts/${workoutId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
        navigate(`/calendar`);
           //    onClose();
    } catch (error) {
        console.error("Error deleting workout:", error);
    }
};

const handleUpdate = (workout) => {
    navigate(`/workouts/${workout._id}`);
    };
    
    const renderWorkouts = () => {
        return currentWorkouts.map((workout) => (
            <tr key={workout._id}>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6">
                    {workout.workoutType.charAt(0).toUpperCase() +
                        workout.workoutType.slice(1)}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6">
                    {workout.duration}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6">
                    {workout.intensity.charAt(0).toUpperCase() +
                        workout.intensity.slice(1)}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6">
                    {workout.indoor ? "Indoor" : "Outdoor"}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6">
                    {formatDate(workout.date)}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6 description-cell">
                    {workout.description}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl pt-10 pb-10 w-1/6">
                    <img
                        src={editIcon}
                        alt="Edit"
                        className="cursor-pointer text-white w-6 h-6 mr-2 mb-4"
                        onClick={() => handleUpdate(workout)}
                    />
                    <img
                        src={deleteIcon}
                        alt="Delete"
                        className="cursor-pointer w-6 h-6"
                        onClick={() => handleDelete(workout)}
                    />
                </td>
            </tr>
        ));
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className=" min-h-screen flex items-start justify-center">
            <div className="max-w-screen-lg mx-auto p-4">
                <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th
                                className="py-2 px-4 bg-blue-500 text-xl text-white cursor-pointer"
                                onClick={() => handleSort("workoutType")}
                            >
                                Workout
                            </th>
                            <th
                                className="py-2 px-4 bg-blue-500 text-xl text-white cursor-pointer"
                                onClick={() => handleSort("duration")}
                            >
                                Duration (minutes)
                            </th>
                            <th
                                className="py-2 px-4 bg-blue-500 text-xl text-white cursor-pointer"
                                onClick={() => handleSort("intensity")}
                            >
                                Intensity
                            </th>
                            <th
                                className="py-2 px-4 bg-blue-500 text-xl text-white cursor-pointer"
                                onClick={() => handleSort("indoor")}
                            >
                                Venue
                            </th>
                            <th
                                className="py-2 px-4 bg-blue-500 text-xl text-white cursor-pointer"
                                onClick={() => handleSort("date")}
                            >
                                Date
                            </th>
                            <th
                                className="py-2 px-4 bg-blue-500 text-xl text-white cursor-pointer"
                                onClick={() => handleSort("description")}
                            >
                                Description
                            </th>
                            <th className="py-2 px-6  bg-blue-500 text-xl text-white cursor-pointer">
                                <span className="text-blue-500">________</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderWorkouts()}</tbody>
                </table>
                {/* Pagination */}
                <div className="flex items-center justify-center mt-4">
                    {Array.from(
                        {
                            length: Math.ceil(
                                workouts.length / workoutsPerPage
                            ),
                        },
                        (_, i) => (
                            <button
                                key={i + 1}
                                className={`mx-1 px-3 py-1 rounded ${
                                    i + 1 === currentPage
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-blue-500"
                                }`}
                                onClick={() => paginate(i + 1)}
                            >
                                {i + 1}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Workouts;
