import React from "react";

const About = () => {
    return (
        <section className="bg-gradient-to-b from-custom-color  to-blue-500 min-h-screen flex items-start justify-center font-nunito">
            <div className="max-w-7xl mx-20 text-start">
                <h2 className="text-m md:text-3xl lg:text-4xl font-bold mb-8 text-white font-nunito">
                    Design your own workouts with{" "}
                    <span className="text-blue-600 text-2xl md:text-5xl lg:text-6xl font-bold mb-4  font-nunito">
                        {" "}
                        Tri Fit{" "}
                    </span>
                </h2>
                <p className="text-white text-2xl md:text-4xl lg:text-2xl mb-6 font-nunito">
                    Our app is your companion in achieving your fitness goals.{" "}
                    <span className="md:text-xl lg:text-3xl font-bold mb-4 text-blue-500 font-nunito">
                        {" "}
                        Tri Fit{" "}
                    </span>
                    offers a customizable schedule that empowers you to plan and
                    execute your training sessions strategically. It enables you
                    to take control of your fitness journey by providing a
                    platform to design, track, and manage your workouts
                    effectively, ensuring a personalized and tailored
                    experience.
                </p>
            </div>
        </section>
    );
};

export default About;
