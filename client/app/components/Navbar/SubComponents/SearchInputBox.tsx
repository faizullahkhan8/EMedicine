import React, { FC, useState } from "react";
import { MdSearch } from "react-icons/md";
import { BsPinMapFill } from "react-icons/bs";
import { useSearchParams, useRouter } from "next/navigation";

interface ISearchInputBox {
    isMobile: boolean;
}

const SearchInputBox: FC<ISearchInputBox> = ({ isMobile }) => {
    const [searchQuery, setSearchQuery] = useState<string>(
        useSearchParams().get("search_q") || ""
    );
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery && searchQuery !== "") {
            router.push(`/pharmacy/search?search_q=${searchQuery}`);
        }
    };

    return (
        <>
            <div
                className={`flex ${
                    isMobile ? "800px:hidden" : "max-800px:hidden"
                } items-center justify-center gap-2 w-full h-10`}
            >
                <div className="flex items-center flex-1 gap-2 shadow-md border rounded-md dark:border-transparent dark:bg-colors-mainBackground">
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
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            type="text"
                            className="outline-none flex-1 w-full text-md h-6 bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-300"
                            placeholder="Search for Medicines, Wellness, Beauty, Devices and much more... "
                        />
                        <div
                            onClick={handleSearch}
                            className="bg-blue-600 hover:cursor-pointer hover:bg-colors-secondary h-10 rounded-e-md flex items-center justify-center p-2"
                        >
                            <MdSearch className="text-[28px] text-[#fff]" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchInputBox;
