import React from "react";
import iconInstagram from "../assets/insta.png";
import iconLinkdin from "../assets/link.png";
import iconGithub from "../assets/git.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-t from-custom-color  to-blue-500 text-white py-2 text-center">
            <div className="flex justify-center items-center space-x-4">
                <a
                    href="https://www.instagram.com/angeleyelive"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={iconInstagram}
                        alt="Instagram icon"
                        className="h-8 w-8 hover:opacity-55"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/oxanamich"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={iconLinkdin}
                        alt="LinkedIn icon"
                        className="h-8 w-8 hover:opacity-55"
                    />
                </a>
                <a
                    href="https://github.com/oxangyal"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={iconGithub}
                        alt="GitHub icon"
                        className="h-8 w-8 hover:opacity-55"
                    />
                </a>
            </div>
            <p className="text-sm mt-4 font-nunito">
                &copy; {currentYear} Oxana Michkasova. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
