module.exports = {
    purge: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            dmsans: ['DMSans', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: '#676BF6',
                background: '#C1EDD9',
                subtext: '#696969',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
