import React, { useState } from "react";

import BurgerMenuIcon from "../assets/burgermenu.png";
import CloseIcon from "../assets/closeburger.png";
import { Link } from "react-router-dom";
import Logo from "../assets/triblue.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className="bg-151c1e text-white text-base p-4 font-nunito">
                <div className="flex items-center justify-between">
                    <div className="flex items-center pl-10">
                        <img
                            src={Logo}
                            alt="Logo icon"
                            className="w-14 h-14 mr-6"
                        />
                        <span className="text-blue-500 text-2xl font-bold">
                            Tri Fit
                        </span>
                    </div>
                    <div className="lg:hidden">
                        {/* Show only on small screens */}
                        <button
                            onClick={toggleMenu}
                            className="text-white text-lg focus:outline-none"
                        >
                            {/* Toggle between burger menu icon and close icon */}
                            {menuOpen ? (
                                <img
                                    src={CloseIcon}
                                    alt="Close icon"
                                    className="w-6 h-6"
                                />
                            ) : (
                                <img
                                    src={BurgerMenuIcon}
                                    alt="Burger menu icon"
                                    className="w-6 h-6"
                                />
                            )}
                        </button>
                    </div>
                    <div
                        className={`lg:flex space-x-4 ${
                            menuOpen ? "flex flex-col" : "hidden"
                        }`}
                    >
                        {/* Show on large screens and mobile */}
                        <Link
                            to="/"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            About
                        </Link>
                        <Link
                            to="/calendar"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            Calendar
                        </Link>
                        <Link
                            to="/activities"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            Activites
                        </Link>
                        {/* <Link
                            to="/createworkout"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            Create workout
                        </Link> */}
                        {/* <Link
                            to="/workouts"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            Workouts
                        </Link> */}
                        {/* <Link
                            to="/createrace"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            Create race
                        </Link> */}

                        {/* <Link
                            to="/races"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            Races
                        </Link> */}
                        <Link
                            to="/create"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            Create
                        </Link>

                        {/* <Link
                            to="/newcalendar"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            New calendar
                        </Link> */}
                        {/* <Link
                            to="/register"
                            className={`text-white text-2xl px-4 py-2 rounded ${
                                menuOpen
                                    ? "bg-custom-color"
                                    : "bg-blue-600 hover:bg-blue-500"
                            } transition duration-300`}
                        >
                            Signup
                        </Link>  */}
                        <Link
                            to="/auth"
                            className={`text-white text-xl px-4 py-2 font-bold rounded hover:bg-gray-700  ${
                                menuOpen
                                    ? "bg-custom-color"
                                    : "bg-blue-500 hover:bg-blue-500"
                            } transition duration-300`}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
