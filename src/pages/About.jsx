import React from "react";

const About = () => {
    return (
        <div className="bg-gradient-to-b from-custom-color  to-blue-500 min-h-screen flex items-start justify-center">
            <div className="max-w-md mx-auto text-center">
                <h1 className="text-lg md:text-5xl lg:text-6xl font-bold mb-4 text-blue-500">
                    Tri Fit
                </h1>
                <p className="text-gray-500 text-custon-font md:text-xl lg:text-2xl font-nunito">
                    Stay fit for your upcoming events! Tri Fit is your ultimate
                    destination for fitness and training. Whether you're a
                    swimmer, cyclist, or runner, we've got you covered. Join us
                    on the journey to a healthier lifestyle and peak
                    performance.
                </p>
            </div>
        </div>
    );
};

export default About;
