/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import MobileSideBarList from "./MobileSideBarList";

type MobileSideBarOptions = {
    setIsMobileSideBarActive: (status: boolean) => void;
};

const MobileSideBar = ({ setIsMobileSideBarActive }: MobileSideBarOptions) => {
    return (
        <div
            className="800px:hidden fixed w-full h-screen top-0 left-0 z-[999] dark:bg-[unset] bg-[#00000024]"
            onClick={(e: any) => {
                if (e.target.id === "screen") {
                    setIsMobileSideBarActive(false);
                }
            }}
            id="screen"
        >
            <div className="w-[70%] fixed z-[9999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 px-4  overflow-x-scroll scroll-smooth">
                <div className="w-full text-center text-[25px]">
                    <Link href={"#"}>
                        <p className="dark:text-white font-bold text-[25px] py-6 text-blue-600">
                            EMedicine
                        </p>
                    </Link>
                </div>
                {/* List items  */}
                <MobileSideBarList />
            </div>
        </div>
    );
};

export default MobileSideBar;
