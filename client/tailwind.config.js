/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#d4af37', // Deep Teal (Titan-like)
                secondary: '#232323', // Charcoal Gray
                accent: '#f3f4f6', // Light Gray background
                gold: '#d4af37', // Kept for accents/ratings
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Outfit', 'sans-serif'],
                accent: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
