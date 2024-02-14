import React, { useEffect, useState } from "react";

import axios from "axios";
import deleteIcon from "../assets/deleteicon.png";
import editIcon from "../assets/editicon.png";
import { useNavigate } from "react-router";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Races = () => {
    const navigate = useNavigate();
    const [races, setRaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortField, setSortField] = useState("date");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/races/list?page=${currentPage}&sortField=${sortField}&sortOrder=${sortOrder}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );
                setRaces(response.data.races);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching races:", error);
                setError(
                    "An error occurred while fetching races. Please try again later."
                );
                setLoading(false);
            }
        };

        fetchRaces();
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
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
        setCurrentPage(1);
    };

    const handleDelete = async (race) => {
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            const raceId = race._id;

            await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/api/v1/races/${raceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            setRaces((prevRaces) => prevRaces.filter((r) => r._id !== raceId));

            if (races.length === 1) {
                const newPage = currentPage > 1 ? currentPage - 1 : 1;
                setCurrentPage(newPage);
            }
        } catch (error) {
            console.error("Error deleting race:", error);
        }
    };

    const handleUpdate = (race) => {
        navigate(`/races/${race._id}`);
    };

    const renderRaces = () => {
        return races.map((race) => (
            <div
                key={race._id}
                className="flex items-center justify-between border-b border-gray-200 p-4"
            >
                <div className="w-52">
                    <p className="text-sm text-white">
                        {formatDate(race.date)}
                    </p>
                    <p className="text-md text-white font-semibold">
                        {race.title}
                    </p>
                    <p className="text-md text-white ">
                        {race.timeOfCompletion.hours}h{" "}
                        {race.timeOfCompletion.minutes}m
                    </p>
                    <p className="text-md text-white ">
                        {race.location.city}, {race.location.state}
                    </p>
                    <div className="w-36">
                        <p className="text-sm text-white mr-2">
                            {race.description}
                        </p>
                    </div>
                </div>
                <div className="flex gap-1 pl-2">
                    {/* Edit and Delete icons */}
                    <img
                        src={editIcon}
                        alt="Edit"
                        className="cursor-pointer w-4 h-4"
                        onClick={() => handleUpdate(race)}
                    />
                    <img
                        src={deleteIcon}
                        alt="Delete"
                        className="cursor-pointer w-4 h-4"
                        onClick={() => handleDelete(race)}
                    />
                </div>
            </div>
        ));
    };

    return (
        <div className="min-h-screen flex items-start justify-center">
            <div className="w-96 mx-auto p-4">
                <div className="flex justify-center gap-5 items-center mb-4">
                    {/* Button to sort races by date */}
                    <button
                        className="bg-blue-500 text-white px-4 sm:text-sm:px-0 md:text-md lg:text-lg py-2 rounded-md"
                        onClick={() => handleSort("date")}
                    >
                        Sort by Date
                    </button>
                    {/* Button to sort races by race type */}
                    <button
                        className="bg-blue-500 text-white px-4 sm:text-sm:px-0 md:text-md lg:text-lg py-2 rounded-md"
                        onClick={() => handleSort("timeOfCompletion")}
                    >
                        Sort by Performance
                    </button>
                </div>
                {/* Render races */}
                {loading ? (
                    <div className="text-white">Loading...</div>
                ) : error ? (
                    <div className="text-white">{error}</div>
                ) : (
                    <div>
                        {renderRaces()}
                        <div className="flex justify-center mt-4">
                            {renderPagination()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Races;
