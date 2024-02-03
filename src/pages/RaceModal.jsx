import React from "react";

const RaceModal = ({ event, onClose }) => {
    const formattedDate = new Date(event.date).toLocaleDateString("en-US");

    return (
        <div className="bg-gradient-to-b from-custom-color to-violet-400 p-4 text-white bg-white border-t border-gray-300 z-10">
            <div className="max-w-screen-md mx-auto p-4 rounded-2xl shadow-xl">
                <h2 className="text-lg font-bold mb-2">
                    {event.race.toUpperCase()}
                </h2>
                <p className="mb-2">Title: {event.title.toUpperCase()}</p>
                <p className="mb-2">
                    Performance: {event.duration.hours}h{" "}
                    {event.duration.minutes}m
                </p>
                <p className="mb-2">Location: {event.location}</p>
                <p className="mb-2">Date: {formattedDate}</p>
                <button
                    className="mt-4 bg-violet-900 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default RaceModal;
