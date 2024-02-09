import { Link } from "react-router-dom";
import React from "react";
import landingImage from "../assets/tri.jpg";

const Home = () => {
    const containerStyles = {
        position: "relative",
        minHeight: "100vh", 
    };

    const backgroundStyles = {
        backgroundImage: `url(${landingImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    const overlayStyles = {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(21, 28, 30, 0.7)",
        // backdropFilter: "blur(2px)",
    };

    const buttonStyles = {
        position: "absolute",
        bottom: "70%", 
        left: "80%", 
        transform: "translateX(-140%)",
        zIndex: 2,
    };

    return (
        <div
            className="min-h-screen flex items-start justify-center"
            style={containerStyles}
        >
            <div className="shadow-md" style={backgroundStyles}></div>
            <div style={overlayStyles}></div>
            <div style={{ zIndex: 3 }}>
                <div className="text-white md:text-5xl lg:text-6xl sm:text-4xl ml-auto mt-20 font-bold font-nunito">
                    Stay fit for your upcoming triathlon events with{" "}
                    <span className="text-blue-500  md:text-3xl lg:text-5xl font-bold mb-20">
                        {" "}
                        Tri Fit{" "}
                    </span>{" "}
                </div>
                <button
                    className="bg-blue-500 text-white text-xl font-bold py-4 px-10  hover:bg-gray-700  rounded-full font-nunito"
                    style={buttonStyles}
                >
                    <Link to="/auth">Get started</Link>
                </button>
            </div>
        </div>
    );
};

export default Home;
