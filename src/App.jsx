import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Auth from "./pages/Auth";
import Calendar from "./pages/Calendar";
import CreateRace from "./pages/CreateRace.jsx";
import CreateWorkout from "./pages/CreateWorkout";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Races from "./pages/Races";
import React from "react";
import Register from "./pages/Register";
// import UpdateWorkout from "./pages/UpdateWorkout";
import Workouts from "./pages/Workouts";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/createworkout" element={<CreateWorkout />} />
                    <Route path="/createrace" element={<CreateRace />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/workouts" element={<Workouts />} />
                    <Route path="/races" element={<Races />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* <Route path="/update" element={<UpdateWorkout />} /> */}
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
};

export default App;
