import React from "react";
import axios from "axios";
import closeModal from "../assets/closeicon.png";
import deleteModal from "../assets/deletemodal.png";
import editModal from "../assets/editmodal.png";
import { useNavigate } from "react-router-dom";

// import { useRaceData } from "./context/RaceDataContext";

const RaceModal = ({ event, onClose }) => {
    const navigate = useNavigate();
    const formattedDate = new Date(event.date).toLocaleDateString("en-US");

    const handleDelete = async () => {
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            const raceId = event.id;
            console.log(event.id, event)
            await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/api/v1/races/${raceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            onClose();
        } catch (error) {
            console.error("Error deleting race:", error);
        }
    };


    const handleUpdate = () => {
        
        navigate(`/races/${event.id}`);
    };

    return (
        <div className="bg-74629B p-4 text-white border-t border-gray-300 z-10">
            <div className="z-10 relative">
                <img
                    src={closeModal}
                    alt="Close"
                    className="absolute top-6 right-9 cursor-pointer w-8 h-8"
                    onClick={onClose}
                />
                <div className="max-w-screen-md mx-auto p-4 rounded-3xl shadow-xl">
                    <h2 className="text-lg font-bold mb-2">
                        {event.race.toUpperCase()}
                    </h2>
                    <p className="mb-2">Title: {event.title.toUpperCase()}</p>
                    <p className="mb-2">
                        Performance: {event.timeOfCompletion}
                    </p>
                    <p className="mb-2">Location: {event.location}</p>
                    <p className="mb-2">Date: {formattedDate}</p>

                    <div className="flex justify-between items-center mt-4">
                        <div className="flex">
                            <img
                                src={editModal}
                                alt="Edit"
                                className="cursor-pointer w-8 h-8 mr-2"
                                onClick={handleUpdate}
                            />
                            <img
                                src={deleteModal}
                                alt="Delete"
                                className="cursor-pointer w-8 h-8"
                                onClick={handleDelete}
                            />
                        </div>
                    </div>
                    {/* <div className="flex justify-between items-center mt-4">
                        <div className="flex">
                            {/* <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                                onClick={onUpdate}
                            >
                                Update
                            </button> */}
                    {/* <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={handleDelete}
                        >
                            Delete
                        </button> */}
                    {/* <img
                                src={editModal}
                                alt="Edit"
                                className="top-8 left-55 cursor-pointer w-8 h-8"
                                // onClick={handleUpdate}
                            />
                        </div>
                            <img
                                src={deleteModal}
                                alt="Delete"
                                className="bottom-5 right-45 cursor-pointer w-8 h-8"
                                onClick={handleDelete}
                            />
                        </div> */}
                    {/* <button
                        className="ml-2 bg-violet-900 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        onClick={onClose}
                    >
                        Close
                    </button> */}
                    {/* </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default RaceModal;
