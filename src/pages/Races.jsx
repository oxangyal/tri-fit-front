import React, { useEffect, useState } from "react";

import axios from "axios";
import deleteIcon from "../assets/deleteicon.png";
import editIcon from "../assets/editicon.png";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Races = () => {
    const navigate = useNavigate();
    const [races, setRaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState({ field: "", direction: "asc" });
    const racesPerPage = 4;

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/v1/races`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                    
                );
                console.log(response.data);
                setRaces(response.data.races);
            } catch (error) {
                console.error("Error fetching races:", error);
            }
        };

        fetchRaces();
    }, []);

    const indexOfLastRace = currentPage * racesPerPage;
    const indexOfFirstRace = indexOfLastRace - racesPerPage;
    const currentRaces = races.slice(indexOfFirstRace, indexOfLastRace);

    const handleSort = (field) => {
        const direction =
            sortOrder.field === field && sortOrder.direction === "asc"
                ? "desc"
                : "asc";

        const sortedRaces = [...races].sort((a, b) => {
            if (field === "date") {
                const dateA = new Date(a[field]).getTime();
                const dateB = new Date(b[field]).getTime();
                return direction === "asc" ? dateA - dateB : dateB - dateA;
            } else if (field === "location") {
                const locationA = `${a.location.city}, ${a.location.state}`;
                const locationB = `${b.location.city}, ${b.location.state}`;
                return direction === "asc"
                    ? locationA.localeCompare(locationB)
                    : locationB.localeCompare(locationA);
            } else {
                return direction === "asc"
                    ? a[field] > b[field]
                        ? 1
                        : -1
                    : a[field] < b[field]
                    ? 1
                    : -1;
            }
        });

        setRaces(sortedRaces);
        setSortOrder({ field, direction });
    };

const handleDelete = async (race) => {
    try {
        const jwtToken = localStorage.getItem("jwtToken");
        const raceId = race._id;
        console.log(race);
        console.log(raceId);
        await axios.delete(
            `${process.env.REACT_APP_BASE_URL}/api/v1/races/${raceId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
        navigate(`/activities`);
        //    onClose();
    } catch (error) {
        console.error("Error deleting race:", error);
    }
};

const handleUpdate = (race) => {
    navigate(`/races/${race._id}`);
};
    
    const renderRaces = () => {
        return currentRaces.map((race) => (
            <tr key={race.id}>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6">
                    {race.race.charAt(0).toUpperCase() + race.race.slice(1)}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6">
                    {race.title}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6">
                    {race.timeOfCompletion.hours}h{" "}
                    {race.timeOfCompletion.minutes}m
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6">
                    {formatDate(race.date)}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl text-white pt-10 pb-10 w-1/6 description-cell">
                    {race.location.city}, {race.location.state}
                </td>
                <td className="py-2 px-4 md:text-lg lg:text-xl pt-10 pb-10 w-1/6">
                    <img
                        src={editIcon}
                        alt="Edit"
                        className="cursor-pointer text-white w-6 h-6 mr-2 mb-4"
                        onClick={() => handleUpdate(race)}
                    />
                    <img
                        src={deleteIcon}
                        alt="Delete"
                        className="cursor-pointer w-6 h-6"
                        onClick={() => handleDelete(race)}
                    />
                </td>
            </tr>
        ));
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen flex items-start justify-center">
            <div className="max-w-screen-lg mx-auto p-4">
                <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th
                                className="py-2 px-4 bg-blue-500 text-xl text-white cursor-pointer"
                                onClick={() => handleSort("race")}
                            >
                                Race
                                {/* {sortOrder.field === "race" && (
                                    <span>
                                        {sortOrder.direction === "asc"
                                            ? " ▲"
                                            : " ▼"}
                                    </span>
                                )} */}
                            </th>
                            <th
                                className="py-2 px-4 bg-blue-500 text-white text-xl cursor-pointer"
                                onClick={() => handleSort("title")}
                            >
                                Title
                                {/* {sortOrder.field === "title" && (
                                    <span>
                                        {sortOrder.direction === "asc"
                                            ? " ▲"
                                            : " ▼"}
                                    </span>
                                )} */}
                            </th>
                            <th
                                className="py-2 px-4 bg-blue-500 text-white text-xl cursor-pointer"
                                onClick={() => handleSort("timeOfCompletion")}
                            >
                                Result
                                {/* {sortOrder.field === "timeOfCompletion" && (
                                    <span>
                                        {sortOrder.direction === "asc"
                                            ? " ▲"
                                            : " ▼"}
                                    </span>
                                )} */}
                            </th>
                            <th
                                className="py-2 px-4 bg-blue-500 text-white  text-xl cursor-pointer"
                                onClick={() => handleSort("date")}
                            >
                                Date
                                {/* {sortOrder.field === "date" && (
                                    <span>
                                        {sortOrder.direction === "asc"
                                            ? " ▲"
                                            : " ▼"}
                                    </span>
                                )} */}
                            </th>
                            <th
                                className="py-2 px-4 bg-blue-500 text-white  text-xl cursor-pointer"
                                onClick={() => handleSort("location")}
                            >
                                Location
                                {/* {sortOrder.field === "location" && (
                                    <span>
                                        {sortOrder.direction === "asc"
                                            ? " ▲"
                                            : " ▼"}
                                    </span>
                                )} */}
                            </th>
                            <th className="py-2 px-4 bg-blue-500 text-white">
                                <span className="text-blue-500">_____</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{renderRaces()}</tbody>
                </table>
                {/* Pagination */}
                <div className="flex items-center justify-center mt-4">
                    {Array.from(
                        {
                            length: Math.ceil(races.length / racesPerPage),
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

export default Races;
