import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ImagesForSlider } from "@/app/utils/RandomData";

const ShowMedicines = () => {
    return (
        <div className="w-full h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2">
            {ImagesForSlider.map((medicine, index) => (
                <div
                    key={index}
                    className="w-full max-w-[300px] mx-auto h-full relative shadow-lg rounded p-3 border dark:bg-colors-mainBackground dark:border-transparent flex flex-col"
                >
                    <div className="absolute rounded-lg w-[3.5rem] h-8 p-2 top-2 right-2 bg-red-500 text-white flex items-center justify-center font-semibold z-10">
                        <p className="text-[12px]">
                            {medicine.percentageOff}% OFF
                        </p>
                    </div>
                    <div className="flex items-center justify-center w-full h-[160px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px]">
                        <Image
                            src={medicine.imageUrl}
                            alt={`slide-${index}`}
                            width={160}
                            height={160}
                            className="object-contain w-auto h-full rounded shadow"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2 mt-2">
                        <h3 className="text-[15px] sm:text-[14px] md:text-[16px] font-semibold">
                            {medicine.medicineName}
                        </h3>
                        <p className="text-[13px] sm:text-[12px] md:text-[14px] mt-1">
                            <span className="font-bold mr-2">
                                ${medicine.price}
                            </span>
                            <sup className="line-through text-red-500 font-semibold">
                                ${medicine.estimatedPrice}
                            </sup>
                        </p>
                        <Link
                            className="w-full text-center p-1 rounded-md text-black dark:text-white font-semibold text-[13px] sm:text-[12px] md:text-[14px] hover:shadow-md shadow-black transition-shadow duration-300 border dark:border-transparent dark:bg-colors-mainBackground"
                            href={medicine.mainItemLocation}
                        >
                            Add to Cart
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowMedicines;
