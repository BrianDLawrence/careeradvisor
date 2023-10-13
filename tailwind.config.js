module.exports = {
    plugins: [require("@tailwindcss/typography"), require('daisyui')],
    daisyui: {
        themes: [
            {
                catetry: {
                    "primary": "#f4e9d9",
                    "secondary": "#C2B9AC",
                    "accent": "#5C5852",
                    "neutral": "#DBD2C3",
                    "base-100": "#ffffff",
                },
            }, "dark", "cmyk"],
    },
};