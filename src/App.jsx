import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import React from "react";

// import Workout from "./pages/Workout";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/about" element={<About />} />
                    {/* <Route path="/workout" element={<Workout />} /> */}
                    <Route path="/auth" element={<Auth />} />
                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> */}
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
};

export default App;
