/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f7fff9',
                    100: '#e9fff0',
                    200: '#c6ffd9',
                    300: '#86f7b0',
                    400: '#43e98f',
                    500: '#14cc6e',
                    600: '#0ea55a',
                    700: '#0b7c47',
                    800: '#075934',
                    900: '#053320'
                }
            }
        }
    },
    plugins: []
};

