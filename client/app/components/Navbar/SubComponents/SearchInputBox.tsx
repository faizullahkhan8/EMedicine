import React from "react";
import { MdSearch } from "react-icons/md";
import { BsPinMapFill } from "react-icons/bs";

const SearchInputBox = () => {
    return (
        <>
            <div className="max-800px:justify-between 800px:flex items-center justify-center hidden gap-2 w-full h-10">
                <div className="flex items-center flex-1 gap-2 border border-black dark:border-colors-primary rounded-md">
                    {/* location */}
                    <div className="h-max flex items-center p-2 justify-center gap-2 border-r dark:border-r-colors-primary border-r-colors-dark pr-4">
                        <BsPinMapFill className="text-[18px] dark:text-white text-colors-dark" />
                        <p className="dark:text-white text-colors-dark font-bold text-[14px]">
                            Bannu
                        </p>
                    </div>
                    {/* Search Input */}
                    <div className="flex w-full items-center gap-2">
                        <input
                            type="text"
                            className="outline-none flex-1 w-full text-lg h-6 bg-transparent placeholder:text-gray-400"
                            placeholder="Search for Medicines, Wellness, Beauty, Devices and much more... "
                        />
                        <div className="bg-blue-600 hover:cursor-pointer hover:bg-colors-secondary h-10 rounded-e-md flex items-center justify-center p-2">
                            <MdSearch className="text-[28px] text-[#fff]" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchInputBox;
