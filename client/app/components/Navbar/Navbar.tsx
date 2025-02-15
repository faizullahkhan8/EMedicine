"use client";
import React, { useEffect, useState } from "react";
import NavigationLinks from "./SubComponents/NavigationLinks";
import { BsFillCartDashFill, BsSearch } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="px-[7rem]">
            {/* Logo and Login */}
            <div className="flex gap-4 my-4">
                <div className="flex items-center justify-center gap-2">
                    <div>LOGO</div>
                    <div>EMedicine</div>
                </div>
                <div className="flex items-center justify-center gap-2 w-full h-10">
                    <div className="flex items-center flex-1 gap-2 border border-black rounded-md">
                        {/* location */}
                        <div className="flex items-center p-2 justify-center gap-2 border-r pr-4">
                            <FiMapPin className="text-2xl text-blue-600" />
                            <p>Bannu</p>
                        </div>
                        {/* Search Input */}
                        <div className="flex w-full items-center gap-2">
                            <input
                                type="text"
                                className="outline-none flex-1 w-full text-lg h-6 placeholder:text-gray-600"
                                placeholder="Search for Medicines, Wellness, Beauty, Devices and much more... "
                            />
                            <div className="bg-blue-600 h-10 rounded-e-md flex items-center justify-center px-2">
                                <BsSearch className="text-2xl text-white mr-2" />
                            </div>
                        </div>
                    </div>
                    {/* Cart Icon */}
                    <div>
                        <BsFillCartDashFill className="text-2xl text-blue-600" />
                    </div>
                </div>
                {/* Auth Buttons */}
                <div className="flex items-center justify-center gap-1 h-8 p-2 border border-black rounded-md">
                    <Link href="#">Login</Link>
                    <p>/</p>
                    <Link href="#">Signup</Link>
                </div>
            </div>
            {/* Links */}
            <div className="flex items-center justify-between gap-4">
                {/* First Link */}
                <div>Homepage</div>
                <div className="flex items-center justify-center gap-4">
                    <NavigationLinks />
                </div>
                <div>
                    <p>Uplaod Your Prescription</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
