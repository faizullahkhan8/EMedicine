"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex items-center justify-center 800px:mx-2">
            {theme === "light" ? (
                <BiMoon
                    className="cursor-pointer"
                    fill="black"
                    size={18}
                    onClick={() => setTheme("dark")}
                />
            ) : (
                <BiSun
                    className="cursor-pointer dark:text-white"
                    size={18}
                    onClick={() => setTheme("light")}
                />
            )}
        </div>
    );
};
