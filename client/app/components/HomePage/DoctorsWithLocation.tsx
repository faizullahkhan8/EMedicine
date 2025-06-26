import { DoctorsWithLocationData } from "@/app/utils/RandomData";
import React from "react";

const DoctorsWithLocation = () => {
    const loction: Array<string> = [
        "Lahore",
        "Karachi",
        "Islamabad",
        "Peshawar",
    ];

    return (
        <div className="flex flex-wrap justify-between gap-1">
            {loction.map((location, index) => (
                <div key={index}>
                    <h2 className="text-colors-primary font-semibold text-[16px]">
                        Doctors in {location}
                    </h2>
                    <ul className="flex flex-col gap-1 mt-2 list-disc ">
                        {DoctorsWithLocationData.map((doctor, doctorIndex) => (
                            <li
                                key={doctorIndex}
                                className="text-[12px] cursor-pointer hover:text-colors-primary transition-colors duration-100"
                            >
                                {`${doctor} in ${location}`}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default DoctorsWithLocation;
