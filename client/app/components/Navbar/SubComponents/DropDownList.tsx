import React, { FC, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface IDropDownListOptions {
    header: React.ReactElement;
    listItems: Array<string>;
}

const DropDownList: FC<IDropDownListOptions> = ({ header, listItems = [] }) => {
    const [isDropdownListOpen, setIsDropdownListOpen] =
        useState<boolean>(false);
    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
                setIsDropdownListOpen(true);
            }}
            onMouseLeave={() => {
                setIsDropdownListOpen(false);
            }}
        >
            <div className="flex items-center justify-center gap-2">
                {header}
                <FiChevronDown className="dark:text-white text-colors-dark" />
            </div>

            {isDropdownListOpen && (
                <div className="absolute h-auto bg-colors-mainBackground/80 rounded-md border backdrop-blur-xl py-2 w-max">
                    {listItems.map((item, index) => {
                        return (
                            <p
                                key={index}
                                className="text-white text-[14px]  hover:bg-colors-primary/30 hover:cursor-pointer px-2 transition-colors duration-300"
                            >
                                {item}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropDownList;
