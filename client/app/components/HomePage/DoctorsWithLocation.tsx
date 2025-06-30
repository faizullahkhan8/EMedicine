import Button from "@/app/utils/CustomButton";
import { DoctorsWithLocationData } from "@/app/utils/RandomData";
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DoctorsWithLocation = () => {
    const loction: Array<string> = [
        "Lahore",
        "Karachi",
        "Islamabad",
        "Peshawar",
    ];

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = 220; // match min-w-[220px]
        el.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative w-full">
            {/* Left Arrow (only visible on mobile) */}
            <Button
                variant="background"
                type="button"
                className="hidden max-800px:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 !rounded-full shadow p-1"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
            >
                <FaChevronLeft className="text-lg max-500px:text-base max-400px:text-sm" />
            </Button>
            <div
                ref={scrollRef}
                className="flex flex-wrap justify-between gap-1 max-800px:flex-nowrap max-800px:overflow-x-auto max-800px:scrollbar-thin max-800px:scrollbar-thumb-gray-300 max-800px:scrollbar-track-transparent
                hide-scrollbar-mobile"
            >
                {loction.map((location, index) => (
                    <div key={index} className="min-w-[220px] max-800px:mr-2">
                        <h2 className="text-colors-primary font-semibold text-[16px]">
                            Doctors in {location}
                        </h2>
                        <ul className="flex flex-col gap-1 mt-2 max-400px:list-none list-disc">
                            {DoctorsWithLocationData.map(
                                (doctor, doctorIndex) => (
                                    <li
                                        key={doctorIndex}
                                        className="text-[12px] cursor-pointer hover:text-colors-primary transition-colors duration-100"
                                    >
                                        {`${doctor}`}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
            {/* Right Arrow (only visible on mobile) */}
            <Button
                variant="background"
                type="button"
                className="hidden max-800px:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 !rounded-full shadow p-1"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
            >
                <FaChevronRight className="text-lg max-500px:text-base max-400px:text-sm" />
            </Button>
        </div>
    );
};

export default DoctorsWithLocation;
