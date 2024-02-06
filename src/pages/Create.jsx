import "react-tabs/style/react-tabs.css";

import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import CreateRace from "./CreateRace";
import CreateWorkout from "./CreateWorkout";

const Creation = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className="bg-gradient-to-b from-custom-color to-blue-500 min-h-screen flex items-start justify-center">
            <div className="p-8 max-w-md w-full bg-opacity-80">
                <Tabs
                    selectedIndex={tabIndex}
                    onSelect={(index) => setTabIndex(index)}
                >
                    <TabList className="flex mb-4">
                        <Tab
                            className={`flex-1 text-center  text-2xl py-2 rounded-t-lg cursor-pointer ${
                                tabIndex === 0
                                    ? "bg-white text-blue-500"
                                    : "text-white"
                            }`}
                        >
                            Create workout
                        </Tab>
                        <Tab
                            className={`flex-1 text-center text-2xl  py-2 rounded-t-lg cursor-pointer ${
                                tabIndex === 1
                                    ? "bg-white text-blue-500"
                                    : "text-white"
                            }`}
                        >
                        Create Race
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <CreateWorkout />
                    </TabPanel>
                    <TabPanel>
                        <CreateRace />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Creation;
