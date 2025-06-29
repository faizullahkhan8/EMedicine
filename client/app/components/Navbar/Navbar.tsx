/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import NavigationLinks from "./SubComponents/NavigationLinks";
import Link from "next/link";
import SearchInputBox from "./SubComponents/SearchInputBox";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MobileSideBar from "./SubComponents/MobileSideBar";
import { BsFillCartDashFill } from "react-icons/bs";
import Image from "next/image";

const Navbar = () => {
    const [mounted, setMounted] = useState(false);
    const [navBarStaticActive, setNavBarStaticActive] =
        useState<boolean>(false);
    const [isMobileSideBarActive, setIsMobileSideBarActive] =
        useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 100) {
                    setNavBarStaticActive(true);
                } else {
                    setNavBarStaticActive(false);
                }
            });
        }
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="w-full relative z-[2]">
            <div
                className={`dark:bg-[] bg-colors-mainBackground backdrop-blur-md pb-2 ${
                    navBarStaticActive
                        ? "fixed top-0 left-0 w-full z-[9999] px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem] bg-opacity-60  shadow-lg"
                        : "px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem] bg-opacity-60"
                }`}
            >
                {/* Logo and Login */}
                <div className="max-800px:justify-between flex gap-4 py-4">
                    <Link href={"/"} className="flex items-center gap-2">
                        <div className="max-[500px]:hidden">
                            <Image
                                src="/favicon.ico.png"
                                alt="logo"
                                width={100}
                                height={42}
                                className="w-[100px] h-[42px] rounded object-cover"
                            />
                        </div>
                        <div className="font-bold text-[25px] max-800px:text-[18px] text-colors-primary">
                            EMedicine
                        </div>
                    </Link>
                    <div className="flex items-center justify-center w-full max-800px:justify-end">
                        <SearchInputBox />
                        {/* Cart Icon */}
                        <Link href="/orders/cart" className="mx-2 relative">
                            <BsFillCartDashFill className="text-[24px] dark:text-white text-colors-dark hover:cursor-pointer" />
                            <span className="w-4 h-4 flex items-center justify-center absolute top-[-8px] right-[-5px] rounded-full bg-red-600 text-white text-[12px]">
                                2
                            </span>
                        </Link>
                        {/* sun and moon icons */}
                        <ThemeSwitcher />
                        {/* menu icon only for mobile */}
                        <HiOutlineMenuAlt3
                            size={24}
                            className="cursor-pointer dark:text-white text-colors-dark 800px:hidden ml-1"
                            onClick={() => setIsMobileSideBarActive(true)}
                        />
                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <Link
                                href={"/user-profile/FaizUllahKhan"}
                                className="w-10 h-9 rounded-full bg-colors-primary max-800px:hidden"
                            ></Link>
                        ) : (
                            <div className="max-800px:hidden flex items-center justify-center gap-1 h-10 p-2 shadow-md rounded-md border dark:border-transparent dark:bg-colors-mainBackground">
                                <Link
                                    href="/login"
                                    className="dark:text-white text-colors-dark font-semibold text-[14px]"
                                >
                                    Login
                                </Link>
                                <p className="dark:text-white text-colors-dark">
                                    /
                                </p>
                                <Link
                                    href="/sign-up"
                                    className="dark:text-white text-colors-dark font-semibold text-[14px]"
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
                    <div className="dark:text-white text-colors-dark font-semibold cursor-pointer text-[16px] max-800px:text-[13px]">
                        Goto Home
                    </div>
                    <div className="max-800px:justify-between 800px:flex items-center justify-center gap-4 hidden">
                        <NavigationLinks />
                    </div>
                    <div>
                        <p className="dark:text-white text-colors-dark font-semibold cursor-pointer text-[16px] max-800px:text-[13px] ">
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
