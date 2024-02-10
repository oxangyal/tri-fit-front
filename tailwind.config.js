/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                "151c1e": "#151c1e",
                "0e6072": "#0e6072",
                "74629B": "#74629B",
                "298984": "#298984",
                "41b1ab": "#41b1ab",
                "9584bb" : "#9584bb",
            },
            fontFamily: {
                nunito: ["Nunito", "sans-serif"],
            },
            gradientColorStops: {
                "custom-color": "#151c1e",
                "custom-color1": "#74629B",
                "custom-color2": "#41b1ab",
                "custom-color3": "#9584bb",
            },
            text: {
                "custom-font": ["50px"],
            },
        },
    },
    plugins: [],
};

