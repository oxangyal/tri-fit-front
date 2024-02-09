import React from "react";
import rokaImage from "../assets/roka.jpg";

const About = () => {
    return (
        <section className="relative min-h-screen font-nunito">
            <div className="absolute inset-0 z-0">
                <img
                    src={rokaImage}
                    alt="Roka"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 flex items-center justify-center text-white">
                <div className="max-w-7xl mx-20 text-start">
                    <h2 className="text-m md:text-3xl lg:text-4xl font-bold mb-8 text-white font-nunito">
                        Design your own workouts with{" "}
                        <span className="text-blue-600 text-2xl md:text-5xl lg:text-6xl font-bold mb-4  font-nunito">
                            {" "}
                            Tri Fit{" "}
                        </span>
                    </h2>
                    <p className="text-white text-2xl md:text-4xl lg:text-2xl mb-6 font-nunito">
                        Our app is your companion in achieving your fitness
                        goals.{" "}
                        <span className="md:text-xl lg:text-3xl font-bold mb-4 text-blue-500 font-nunito">
                            {" "}
                            Tri Fit{" "}
                        </span>
                        offers a customizable schedule that empowers you to plan
                        and execute your training sessions strategically. Our
                        integrated calendar allows you to seamlessly organize
                        your workouts and races, ensuring a well-balanced
                        training regimen that optimizes your progress.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
