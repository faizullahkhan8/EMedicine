import { howWeWorkData } from "@/app/utils/RandomData";
import Image from "next/image";
import React from "react";

const HowWeWork = () => {
    const [dataIndex, setDataIndex] = React.useState(0);
    const Buttons = ["Pharmacy", "Lab Test", "Doctor Appointment"];
    const ImagesUrls = [
        "/images/tab_pharmacy.webp",
        "/images/tab_lab.webp",
        "/images/tab_doctor.webp",
    ];

    return (
        <div className="flex gap-4 max-800px:items-start max-800px:flex-col my-8">
            {/* Left */}
            <div className="flex flex-col gap-2 w-[40%] max-800px:w-full">
                <p className="text-[14px] font-thin">How We Work</p>
                <h2 className="text-[24px] font-semibold max-800px:text-[20px]">
                    Serving All Your Healthcare <br /> Needs At One Place !
                </h2>
                <div className="flex gap-2">
                    {Buttons.map((button, index) => (
                        <button
                            key={index}
                            onClick={() => setDataIndex(index)}
                            className={`rounded-full max-800px:px-2 max-800px:text-[10px] px-3 py-1 shadow-md bg-colors-mainBackground border dark:border-transparent ${
                                dataIndex === index
                                    ? "bg-colors-primary text-white"
                                    : ""
                            }`}
                        >
                            {button}
                        </button>
                    ))}
                </div>
                <div>
                    <h4 className="text-[16px] max-800px:text-[14px] my-2">
                        {howWeWorkData[dataIndex].title}
                    </h4>
                    <ol
                        className="list-disc flex flex-col gap-2
                     pl-5 text-[14px] max-800px:text-[12px]"
                    >
                        {howWeWorkData[dataIndex].steps.map((step, index) => (
                            <li key={index}>{step} </li>
                        ))}
                    </ol>
                </div>
            </div>
            {/* Right */}
            <div className="w-[70%] h-[20rem] max-800px:w-full max-800px:h-full flex items-center justify-center">
                {ImagesUrls[dataIndex] && (
                    <Image
                        src={ImagesUrls[dataIndex]}
                        alt="How We Work"
                        width={500}
                        height={500}
                        className="max-800px:w-[70%] w-[70%] max-800px:h-auto object-fill"
                    />
                )}
            </div>
        </div>
    );
};

export default HowWeWork;
