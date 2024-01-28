import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/triblue.png";
import BurgerMenuIcon from "../assets/burgermenu.png"; // Import your custom burger menu icon
import CloseIcon from "../assets/closeburger.png"; // Import your custom close icon

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className="bg-151c1e text-white text-xl p-6 font-nunito">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src={Logo}
                            alt="Logo icon"
                            className="w-28 h-28 mr-6"
                        />
                        <span className="text-xl font-bold">Tri Fit</span>
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
                        {/* Show on large screens and mobile menu */}
                        <Link
                            to="/about"
                            className="text-white text-lg px-4 py-2 rounded bg-151c1e hover:bg-gray-800 transition duration-300"
                        >
                            About
                        </Link>
                        <Link
                            to="/workouts"
                            className="text-white text-lg px-4 py-2 rounded bg-151c1e hover:bg-gray-800 transition duration-300"
                        >
                            Workouts
                        </Link>
                        <Link
                            to="/register"
                            className={`text-white text-lg px-4 py-2 rounded ${
                                menuOpen
                                    ? "bg-custom-color"
                                    : "bg-blue-600 hover:bg-blue-500"
                            } transition duration-300`}
                        >
                            Signup
                        </Link>
                        <Link
                            to="/login"
                            className={`text-white text-lg px-4 py-2 rounded ${
                                menuOpen
                                    ? "bg-custom-color"
                                    : "bg-blue-600 hover:bg-blue-500"
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
