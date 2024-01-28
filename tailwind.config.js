/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                "151c1e": "#151c1e",
                "0e6072": "#0e6072",
            },
            fontFamily: {
                nunito: ["Nunito", "sans-serif"],
            },
            gradientColorStops: {
                "custom-color": "#151c1e",
            },
            text: {
                "custom-font": ["50px"],
      },

            
        },
    },
    plugins: [],
};

