import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                calligraphy: ['var(--font-calligraphy)'],
            },
            colors: {
                primary: {
                    50: '#F5F7EC',  // Background Latar
                    100: '#E2E8D5', // Dekorasi halus
                    400: '#C6D870', // Tombol (Lime/Chartreuse)
                    500: '#9AB89D', // Aksen / Garis / Icon
                    600: '#A1BC98', // Background Grid
                    900: '#B0DB9C', // Element Berat (Darker for buttons)
                    950: '#2A332B', // Teks Bacaan (Kontras Tinggi)
                }
            },
        },
    },
    plugins: [],
};
export default config;
