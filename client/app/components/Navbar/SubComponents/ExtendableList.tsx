import Image from "next/image";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type ExtendableListOptions = {
    header: string;
    imageUrl: string;
    listItems: string[];
};

const ExtendableList = ({
    header,
    imageUrl,
    listItems,
}: ExtendableListOptions) => {
    const [isExtendableListOpen, setIsExtendableListOpen] = useState(false);

    return (
        <div className="relative w-full border p-2">
            {/* Header (Clickable) */}
            <div
                className={`flex items-center justify-between gap-2 hover:cursor-pointer w-full ${
                    isExtendableListOpen && "border-b"
                } pb-2 text-colors-dark`}
                onClick={() => setIsExtendableListOpen((prev) => !prev)}
            >
                <Image
                    src={`/images/${imageUrl}`}
                    alt="beauti and wellness svg"
                    width={100}
                    height={100}
                    className="w-[50px] dark:invert"
                />
                <p className="w-full dark:text-white font-semibold text-[14px]">
                    {header}
                </p>
                {isExtendableListOpen ? (
                    <FiChevronUp className="dark:text-white transition-transform duration-300" />
                ) : (
                    <FiChevronDown className="dark:text-white transition-transform duration-300" />
                )}
            </div>

            {/* Expandable List with Smooth Transition */}
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isExtendableListOpen
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                {listItems.map((item, index) => (
                    <p
                        key={index}
                        className="pl-6 text-[13px] hover:bg-blue-500 dark:text-white hover:cursor-pointer text-black px-2 py-1"
                    >
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ExtendableList;
