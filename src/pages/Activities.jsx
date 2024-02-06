import React, { useState } from "react";
import Workouts from "./Workouts"; 
import Races from "./Races"; 

const Activities = () => {
    const [activeTab, setActiveTab] = useState("workouts");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-gradient-to-b from-custom-color to-blue-500 min-h-screen flex items-start justify-center">
            <div className="max-w-screen-lg mx-auto p-4">
                <div className="flex mb-4">
                    <button
                        className={`mx-2 px-4 text-2xl py-2 rounded ${
                            activeTab === "workouts"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"
                        }`}
                        onClick={() => handleTabChange("workouts")}
                    >
                        Workouts
                    </button>
                    <button
                        className={`mx-2 px-4 py-2 text-2xl rounded ${
                            activeTab === "races"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"
                        }`}
                        onClick={() => handleTabChange("races")}
                    >
                        Races
                    </button>
                </div>

                {activeTab === "workouts" && <Workouts />}
                {activeTab === "races" && <Races />}
            </div>
        </div>
    );
};

export default Activities;
