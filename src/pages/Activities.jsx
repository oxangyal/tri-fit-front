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
        <div className="bg-gradient-to-b from-custom-color to-blue-500   flex items-start justify-center">
            <div className="max-w-screen-lg mx-auto p-4">
                <Tabs
                    selectedIndex={activeTab}
                    onSelect={(index) => handleTabChange(index)}
                >
                    <TabList className="flex mb-2 flex-wrap">
                        <Tab
                            className={`flex-1 xl:text-xl md:text-md sm:text-sm text-center py-2 rounded-t-lg cursor-pointer ${
                                activeTab === 0
                                    ? "bg-white text-blue-500 "
                                    : "text-white "
                            }`}
                        >
                            Workouts
                        </Tab>
                        <Tab
                            className={`flex-1 xl:text-xl md:text-md sm:text-sm  text-center  py-2 rounded-t-lg cursor-pointer ${
                                activeTab === 1
                                    ? "bg-white text-blue-500"
                                    : "text-white"
                            }`}
                        >
                            Races
                        </Tab>
                    </TabList>
                    <div className="h-50  max-50">
                        <TabPanel>
                            <Workouts />
                        </TabPanel>
                        <TabPanel>
                            <Races />
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default Activities;
