"use client";
import ShowLocationHerarchy from "@/app/utils/ShowLocationHerarchy";
import Image from "next/image";
import React from "react";
import { FaUser, FaCartShopping, FaFolderOpen } from "react-icons/fa6";
import Custominput from "@/app/utils/CustomInput";
import AccountInformation from "@/app/components/Profile/AccountInformation";
import { BsFileRichtextFill } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";

export const AccountInformationData = {
    title: "Account Information",
    description: "Manage your account details and preferences.",
    items: [
        {
            icon: (
                <FaUser className="text-[24px] text-colors-dark dark:text-white" />
            ),
            innerTitle: "My Appointments",
            innerDescription: "Doctor appointments history",
            targetLocation: "#",
        },
        {
            icon: (
                <FaCartShopping className="text-[24px] text-colors-dark dark:text-white" />
            ),
            innerTitle: "My Orders",
            innerDescription: "Pharmacy Orders, Lab test booking history",
            targetLocation: "#",
        },
        {
            icon: (
                <FaFolderOpen className="text-[24px] text-colors-dark dark:text-white" />
            ),
            innerTitle: "Medical Records",
            innerDescription: "Uploaded prescriptions, Lab test results",
            targetLocation: "#",
        },
        {
            icon: (
                <BsFileRichtextFill className="text-[24px] text-colors-dark dark:text-white" />
            ),
            innerTitle: "Blog & Articles",
            innerDescription: "Detailed Articales regarding many diseases",
            targetLocation: "#",
        },
    ],
};

const page = () => {
    return (
        <div className="default-page-padding">
            <ShowLocationHerarchy title="User Profile" />
            <div className="flex flex-col gap-8">
                {/* pic , name and id */}
                <div className="flex items-center gap-4 mt-8">
                    <div className="flex items-center gap-4">
                        <div className="relative p-[3px] bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 rounded-full">
                            <Image
                                src="/images/Passport Size Faiz Ullah.png"
                                alt="User Profile"
                                width={128}
                                height={128}
                                className="w-[8rem] h-[8rem] rounded-full object-cover bg-white"
                            />
                            <button
                                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                                title="Add/Update Profile Picture"
                            >
                                <FiCamera className="text-gray-700" size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] text-gray-500 uppercase">
                            Name
                        </p>
                        <h2 className="text-xl font-bold">John Doe</h2>
                        <p className="text-[10px] text-gray-500 uppercase">
                            Username
                        </p>
                        <p className="text-gray-500">@johndoe</p>
                    </div>
                </div>
                {/* personal details */}
                <div className="my-4 grid grid-cols-2 gap-4 max-800px:grid-cols-1">
                    <div>
                        <p className="text-[16px] text-gray-500">Name</p>
                        <Custominput
                            placeholder="Enter your name..."
                            className="w-full"
                        />
                    </div>
                    <div>
                        <p className="text-[16px] text-gray-500">Name</p>
                        <Custominput
                            placeholder="Enter your name..."
                            className="w-full"
                        />
                    </div>
                    <div>
                        <p className="text-[16px] text-gray-500">Name</p>
                        <Custominput
                            placeholder="Enter your name..."
                            className="w-full"
                        />
                    </div>
                    <div>
                        <p className="text-[16px] text-gray-500">Name</p>
                        <Custominput
                            placeholder="Enter your name..."
                            className="w-full"
                        />
                    </div>
                    <div>
                        <p className="text-[16px] text-gray-500">Name</p>
                        <Custominput
                            placeholder="Enter your name..."
                            className="w-full"
                        />
                    </div>
                </div>
                <div>
                    <AccountInformation
                        title={AccountInformationData.title}
                        description={AccountInformationData.description}
                        items={AccountInformationData.items}
                    />
                </div>
            </div>
        </div>
    );
};

export default page;
