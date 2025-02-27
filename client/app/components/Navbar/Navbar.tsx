/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import NavigationLinks from "./SubComponents/NavigationLinks";
import Link from "next/link";
import SearchInputBox from "./SubComponents/SearchInputBox";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MobileSideBar from "./SubComponents/MobileSideBar";

const Navbar = () => {
    const [mounted, setMounted] = useState(false);
    const [navBarStaticActive, setNavBarStaticActive] =
        useState<boolean>(false);
    const [isMobileSideBarActive, setIsMobileSideBarActive] =
        useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setNavBarStaticActive(true);
            } else {
                setNavBarStaticActive(false);
            }
        });
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="w-full relative">
            <div
                className={`bg-colors-accent pb-2 ${
                    navBarStaticActive
                        ? "fixed top-0 left-0 w-full z-[80] px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem]"
                        : "px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem] "
                }`}
            >
                {/* Logo and Login */}
                <div className="max-800px:justify-between flex gap-4 py-4  ">
                    <Link href={"/"} className="flex items-center gap-2">
                        <div className="font-bold">LOGO</div>
                        <div className="font-bold text-[25px] max-800px:text-[18px] text-colors-primary">
                            EMedicine
                        </div>
                    </Link>
                    <div className="flex items-center justify-center w-full max-800px:justify-end">
                        <SearchInputBox />
                        {/* sun and moon icons */}
                        <ThemeSwitcher />
                        {/* menu icon only for mobile */}
                        <HiOutlineMenuAlt3
                            size={24}
                            className="cursor-pointer text-colors-dark 800px:hidden ml-1"
                            onClick={() => setIsMobileSideBarActive(true)}
                        />
                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <Link
                                href={"/profile"}
                                className="w-10 h-9 rounded-full bg-colors-primary max-800px:hidden"
                            ></Link>
                        ) : (
                            <div className="max-800px:hidden flex items-center justify-center gap-1 h-8 p-2 border  border-black rounded-md">
                                <Link
                                    href="/login"
                                    className="font-semibold text-[14px]"
                                >
                                    Login
                                </Link>
                                <p>/</p>
                                <Link
                                    href="/sign-up"
                                    className="font-semibold text-[14px]"
                                >
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                {/* Links */}
                <div className="flex items-center justify-between gap-4">
                    {/* First Link */}
                    <div className="font-semibold cursor-pointer text-[16px] max-800px:text-[13px]">
                        Goto Home
                    </div>
                    <div className="max-800px:justify-between 800px:flex items-center justify-center gap-4 hidden">
                        <NavigationLinks />
                    </div>
                    <div>
                        <p className="font-semibold cursor-pointer text-[16px] max-800px:text-[13px] ">
                            Uplaod Your Prescription
                        </p>
                    </div>
                </div>
            </div>
            {/* Mobile Side bar */}
            {isMobileSideBarActive && (
                <MobileSideBar
                    isMobileSideBarActive={isMobileSideBarActive}
                    setIsMobileSideBarActive={setIsMobileSideBarActive}
                />
            )}
        </div>
    );
};

export default Navbar;
