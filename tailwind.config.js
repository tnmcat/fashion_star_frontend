const {transform} = require("framer-motion");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            maxWidth: {
                container: "1440px",
            },
            screens: {
                xs: "320px",
                sm: "375px",
                sml: "500px",
                md: "667px",
                mdl: "768px",
                lg: "960px",
                lgl: "1024px",
                xl: "1280px",
                xxl: "1440px",
            },
            fontFamily: {
                titleFont: "Roboto",
                bodyFont: "Poppins",
                shopFont: "Amazon Ember",
            },
            colors: {
                amazon_blue: "#131921",
                amazon_light: "#232F3E",
                amazon_white: "#FFFFFF",
                amazon_yellow: "#febd69",
                amazon_ember: "#007185",
                whiteText: "#ffffff",
                lightText: "#ccc",
                quantity_box: "#F0F2F2",
                footerBottom: "#131A22",
            },
            boxShadow: {
                testShadow: "0px 0px 32px 1px rgb(199,199,199,1)",
                amazonInput: "0 0 3px 2px rgb(228 121 17 / 50%)",
            },
            transFormSlate: {
                transformS: "translate(-50%, -50%);",
            },
        },
    },
    plugins: [],
};
