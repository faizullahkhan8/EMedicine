/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import MobileSideBarList from "./MobileSideBarList";

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
            className={`800px:hidden fixed inset-0 z-[999] bg-black bg-opacity-50 transition-opacity duration-300 ${
                isMobileSideBarActive
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
            }`}
            onClick={(e: any) => {
                if (e.target.id === "screen") {
                    setIsMobileSideBarActive(false);
                }
            }}
        >
            {/* Sidebar */}
            <div
                className={`w-[70%] fixed z-[9999] h-screen shadow-md rounded-tl-md rounded-bl-md bg-colors-background dark:bg-slate-900 bg-opacity-90 top-0 right-0 px-4 overflow-x-scroll scroll-smooth transition-transform duration-300 transform ${
                    isMobileSideBarActive
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0"
                }`}
            >
                <div className="w-full text-center text-[25px]">
                    <Link href={"/"}>
                        <p className="dark:text-white font-bold text-[25px] py-6 text-blue-600">
                            EMedicine
                        </p>
                    </Link>
                </div>

                {/* List Items */}
                <MobileSideBarList />
            </div>
        </div>
    );
};

export default MobileSideBar;
