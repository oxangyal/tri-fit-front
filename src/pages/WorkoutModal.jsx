import React from "react";

const WorkoutModal = ({ event, onClose }) => {
    const formattedDate = new Date(event.date).toLocaleDateString("en-US");

    return (
        <div className="bg-gradient-to-b from-custom-color to-green-300 p-4 text-white bg-white border-t border-gray-300 z-10">
            <div className="max-w-screen-md mx-auto p-4 rounded-2xl shadow-xl">
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
                <button
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default WorkoutModal;
