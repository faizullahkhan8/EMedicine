import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class"],
    theme: {
        extend: {
            colors: {
                colors: {
                    primary: "#0077b6",
                    secondary: "#00b4d8",
                    accent: "#90e0ef",
                    background: "#caf0f8",
                    dark: "#03045e",
                },
            },
            screens: {
                "1000px": "1000px",
                "1100px": "1100px",
                "1200px": "1200px",
                "1300px": "1300px",
                "1500px": "1500px",
                "800px": "800px",
                "400px": "400px",
            },
        },
    },
    plugins: [],
};
export default config;
