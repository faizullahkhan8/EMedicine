import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type ExtendableListOptions = {
    header: string;
    listItems: string[];
};

const ExtendableList = ({ header, listItems }: ExtendableListOptions) => {
    const [isExtendableListOpen, setIsExtendableListOpen] =
        useState<boolean>(false);
    return (
        <div className="relative ">
            <div
                className="flex items-center justify-start gap-2 hover:cursor-pointer w-full text-gray-600 hover:text-gray-900"
                onClick={() => {
                    setIsExtendableListOpen((previousValue) => !previousValue);
                }}
            >
                <p className="dark:text-white font-semibold hover:cursor-pointer text-[14px]">
                    {header}
                </p>
                {isExtendableListOpen ? (
                    <FiChevronUp className="dark:text-white" />
                ) : (
                    <FiChevronDown className="dark:text-white" />
                )}
            </div>

            {isExtendableListOpen && (
                <div className="py-2 w-full ">
                    {listItems.map((item) => {
                        return (
                            <>
                                <p className="pl-6 text-[13px] hover:bg-blue-500 hover:text-white hover:cursor-pointer dark:text-white px-2">
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

export default ExtendableList;
