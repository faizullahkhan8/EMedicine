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
                <div className="absolute h-auto dark:bg-colors-dark bg-colors-accent rounded dark:border dark:border-colors-accent border border-black shadow-sm shadow-colors-dark py-2 w-full">
                    {listItems.map((item, index) => {
                        return (
                            <>
                                <p
                                    key={index}
                                    className="dark:text-white text-colors-dark hover:bg-colors-secondary hover:text-white hover:cursor-pointer px-2"
                                >
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
