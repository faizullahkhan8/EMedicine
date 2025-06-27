/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import MobileSideBarList from "./MobileSideBarList";
import Image from "next/image";
import Button from "@/app/utils/CustomButton";

type MobileSideBarOptions = {
    setIsMobileSideBarActive: (status: boolean) => void;
    isMobileSideBarActive: boolean;
};

const MobileSideBar = ({
    setIsMobileSideBarActive,
    isMobileSideBarActive,
}: MobileSideBarOptions) => {
    return (
        <div
            id="screen"
            className={`800px:hidden w-full fixed inset-0 z-[10000] bg-black bg-opacity-50 transition-opacity duration-300 ${
                isMobileSideBarActive
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
            }`}
            onClick={(e: any) => {
                if (e.target.id === "screen") {
                    setIsMobileSideBarActive(false);
                }
            }}
            onScroll={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            {/* Sidebar */}
            <div
                className={`flex flex-col gap-8 w-[70%] fixed z-[2] h-[100vh] overflow-y-auto shadow-md bg-slate-300/100 dark:bg-slate-900 bg-opacity-100 top-0 right-0 p-4 scroll-smooth transition-transform duration-300 transform ${
                    isMobileSideBarActive
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0"
                }`}
            >
                <div className="w-full text-center text-[25px] mt-4">
                    <Link href={"/"}>
                        <p className="dark:text-white font-bold text-[25px] text-blue-600">
                            EMedicine
                        </p>
                    </Link>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative p-[3px] bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 rounded-full">
                            <Image
                                src="/images/Passport Size Faiz Ullah.png"
                                alt="User Profile"
                                width={400}
                                height={400}
                                className="w-[4rem] h-[4rem] rounded-full object-cover bg-white"
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[10px] text-gray-500 uppercase">
                                Name
                            </p>
                            <h2 className="text-[16px] font-bold">John Doe</h2>
                            <p className="text-[10px] text-gray-500 uppercase">
                                Username
                            </p>
                            <p className="text-[12px] text-gray-500">
                                @johndoe
                            </p>
                        </div>
                    </div>
                    <div>
                        <Link href="/user-profile/faizullahkhan">
                            <Button variant="background">Visit Profile</Button>
                        </Link>
                    </div>
                </div>
                {/* List Items */}
                <MobileSideBarList />
                <div>
                    <Button variant="background">Logout</Button>
                    <p className="text-[14px]">
                        Currently Logged in as Faiz Ullah Khan
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MobileSideBar;
