import "react-tabs/style/react-tabs.css";

import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import Races from "./Races";
import Workouts from "./Workouts";

const Activities = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="bg-gradient-to-b from-custom-color to-blue-500 min-h-screen flex items-start justify-center">
            <div className="max-w-screen-lg mx-auto p-4">
                <Tabs
                    selectedIndex={activeTab}
                    onSelect={(index) => handleTabChange(index)}
                >
                    <TabList className="flex mb-4">
                        <Tab
                            className={`flex-1 text-center text-2xl py-2 rounded-t-lg cursor-pointer ${
                                activeTab === 0
                                    ? "bg-white text-blue-500"
                                    : "text-white"
                            }`}
                        >
                            Workouts
                        </Tab>
                        <Tab
                            className={`flex-1 text-center text-2xl py-2 rounded-t-lg cursor-pointer ${
                                activeTab === 1
                                    ? "bg-white text-blue-500"
                                    : "text-white"
                            }`}
                        >
                            Races
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <Workouts />
                    </TabPanel>
                    <TabPanel>
                        <Races />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Activities;
