import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import BurgerMenuIcon from "../assets/burgermenu.png";
import CloseIcon from "../assets/closeburger.png";
import { Link } from "react-router-dom";
import Logo from "../assets/triblue.png";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { userData, setUserData } = useContext(userDataContext);

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            setUserData({ isLoggedIn: true });
        }
    }, [setUserData]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        console.log("jwtToken");
        setUserData({ isLoggedIn: false });
        // console.log("logged out");
        toast.success("You have successfully logged out.", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        navigate("/");
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
                                    className="w-6 h-6 absolute top-0 right-0 m-4"
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
                    <div className="hidden lg:flex space-x-4">
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
                            to="/create"
                            className="text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                        >
                            Create
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
                            Activities
                        </Link>

                        {userData.isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-white text-xl px-4 py-2 font-bold rounded bg-red-400  hover:bg-gray-700 transition duration-300"
                            >
                                Logout
                            </button>
                        ) : (
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
                        )}
                    </div>
                </div>
            </nav>
            <div
                className={`lg:hidden bg-151c1e text-white text-base p-4 font-nunito ${
                    menuOpen ? "block" : "hidden"
                } flex flex-col justify-center items-center`}
                style={{
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                    borderBottom: "1px solid white",
                }}
            >
                {/* Show on small screens when menu is open */}
                <Link
                    to="/"
                    className="block text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="block text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                >
                    About
                </Link>
                <Link
                    to="/create"
                    className="block text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                >
                    Create
                </Link>
                <Link
                    to="/calendar"
                    className="block text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                >
                    Calendar
                </Link>
                <Link
                    to="/activities"
                    className="block text-white text-xl px-4 py-2 rounded bg-151c1e hover:bg-gray-700 transition duration-300"
                >
                    Activities
                </Link>

                {userData.isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="block text-white text-xl px-4 py-2 font-bold rounded bg-red-400  hover:bg-gray-700 transition duration-300"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/auth"
                        className={`block text-white text-xl px-4 py-2 font-bold rounded hover:bg-gray-700  ${
                            menuOpen
                                ? "bg-custom-color"
                                : "bg-blue-500 hover:bg-blue-500"
                        } transition duration-300`}
                    >
                        Login
                    </Link>
                )}
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Navbar;
