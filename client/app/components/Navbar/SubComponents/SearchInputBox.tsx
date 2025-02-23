import React from "react";
import { BsFillCartDashFill } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import { BsPinMapFill } from "react-icons/bs";

const SearchInputBox = () => {
    return (
        <>
            <div className="max-800px:justify-between 800px:flex items-center justify-center hidden gap-2 w-full h-10">
                <div className="flex items-center flex-1 gap-2 border border-black dark:border-white rounded-md">
                    {/* location */}
                    <div className="flex items-center p-2 justify-center gap-2 border-r pr-4">
                        <BsPinMapFill className="text-[18px] text-blue-600" />
                        <p className="dark:text-white font-bold text-[14px]">
                            Bannu
                        </p>
                    </div>
                    {/* Search Input */}
                    <div className="flex w-full items-center gap-2">
                        <input
                            type="text"
                            className="dark:text-white outline-none flex-1 w-full text-lg h-6 placeholder:text-gray-600"
                            placeholder="Search for Medicines, Wellness, Beauty, Devices and much more... "
                        />
                        <div className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 h-10 rounded-e-md flex items-center justify-center px-2">
                            <MdSearch className="text-[18px] text-white mr-2" />
                        </div>
                    </div>
                </div>
                {/* Cart Icon */}
                <div>
                    <BsFillCartDashFill className="text-[18px] text-blue-600 hover:cursor-pointer" />
                </div>
            </div>
        </>
    );
};

export default SearchInputBox;
