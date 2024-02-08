import React from "react";
import axios from "axios";
import closeIcon from "../assets/closeicon.png";
import deleteModal from "../assets/deletemodal.png";
import editModal from "../assets/editmodal.png";
import { useNavigate } from "react-router-dom";

const WorkoutModal = ({ event, onClose }) => {
    const navigate = useNavigate();

    const formattedDate = new Date(
         new Date(event.date).getTime() + 12 * 60 * 60 * 1000
    ).toLocaleDateString("en-US");

    const handleDelete = async () => {
        try {
            const jwtToken = localStorage.getItem("jwtToken");
            const workoutId = event.id;
            await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/api/v1/workouts/${workoutId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            onClose();
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    const handleUpdate = () => {
        navigate(`/workouts/${event.id}`);
    };
    return (
        <div className="bg-298984 p-4 text-white border-t border-gray-300 z-10 relative">
            <img
                src={closeIcon}
                alt="Close"
                className="absolute top-6 right-12 cursor-pointer w-8 h-8"
                onClick={onClose}
            />

            <div className="max-w-screen-md mx-auto p-4 rounded-3xl shadow-xl">
                <h2 className="text-lg font-bold mb-2">
                    {event.title.toUpperCase()}
                </h2>
                <p className="mb-2">Duration: {event.duration} minutes</p>
                <p className="mb-2">Intensity: {event.intensity}</p>
                <p className="mb-2">
                    Venue: {event.indoor ? "Indoor" : "Outdoor"}
                </p>
                <p className="mb-2">Date: {formattedDate}</p>
                <p>Description: {event.description}</p>

                {/* Edit and Delete icons */}
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
            </div>
        </div>
    );
};

export default WorkoutModal;
