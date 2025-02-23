import React, { FC, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface IDropDownListOptions {
    header: string;
    listItems: Array<string>;
}

const DropDownList: FC<IDropDownListOptions> = ({ header, listItems = [] }) => {
    const [isDropdownListOpen, setIsDropdownListOpen] =
        useState<boolean>(false);
    return (
        <div
            className="relative"
            onMouseEnter={() => {
                setIsDropdownListOpen(true);
            }}
            onMouseLeave={() => {
                setIsDropdownListOpen(false);
            }}
        >
            <div className="flex items-center justify-center gap-2">
                <p className="dark:text-white font-semibold hover:cursor-pointer">
                    {header}
                </p>
                <FiChevronDown className="dark:text-white" />
            </div>

            {isDropdownListOpen && (
                <div className="absolute rounded dark:border dark:border-white border border-black shadow-md py-2 w-full">
                    {listItems.map((item) => {
                        return (
                            <>
                                <p className="hover:bg-blue-500 hover:text-white hover:cursor-pointer dark:text-white px-2">
                                    {item}
                                </p>
                            </>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropDownList;
