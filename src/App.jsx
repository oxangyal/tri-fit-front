import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import React from "react";
import Register from "./pages/Register";


const App = () => {
    return (
        <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/about" element={<About />} />
                <Route path="/" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            
        </BrowserRouter>
        <Footer />
        </>
    );
};

export default App;
