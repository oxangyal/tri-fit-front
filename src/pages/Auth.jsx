import "react-tabs/style/react-tabs.css";

import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import Login from "./Login";
import Register from "./Register";

const Auth = () => {
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
                            className={`flex-1 text-center text-xl py-2 rounded-t-lg cursor-pointer ${
                                tabIndex === 0
                                    ? "bg-white text-blue-500"
                                    : "text-white"
                            }`}
                        >
                            Login
                        </Tab>
                        <Tab
                            className={`flex-1 text-center text-xl  py-2 rounded-t-lg cursor-pointer ${
                                tabIndex === 1
                                    ? "bg-white text-blue-500"
                                    : "text-white"
                            }`}
                        >
                            Signup
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Register />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Auth;
