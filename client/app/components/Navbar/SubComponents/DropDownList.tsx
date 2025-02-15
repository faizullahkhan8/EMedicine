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
                <p>{header}</p>
                <FiChevronDown />
            </div>

            {isDropdownListOpen && (
                <div className="absolute rounded shadow-md py-2 w-full">
                    {listItems.map((item) => {
                        return (
                            <>
                                <p className="hover:bg-blue-500 px-2">{item}</p>
                            </>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropDownList;
