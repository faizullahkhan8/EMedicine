import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface IMedicineCard {
    percentageOff?: number;
    imageUrl: string;
    name: string;
    price: number;
    estimatedPrice: number;
    itemLocation: string;
}

const MedicineCard: FC<IMedicineCard> = ({
    percentageOff,
    estimatedPrice,
    imageUrl,
    itemLocation,
    name,
    price,
}) => {
    return (
        <div className="w-full max-w-[300px] mx-auto h-full relative shadow-lg rounded p-3 border dark:bg-colors-mainBackground dark:border-transparent flex flex-col">
            {percentageOff && (
                <div className="absolute rounded-lg w-[3.5rem] h-6 top-2 right-2 bg-red-500 text-white flex items-center justify-center font-semibold">
                    <p className="text-[12px] max-800px:text-[10px] max-400px:text-[8px]">
                        {percentageOff}%{" "}
                        <span className="max-sm:hidden">OFF</span>
                    </p>
                </div>
            )}
            <div className="flex items-center justify-center w-full h-[160px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px]">
                <Image
                    src={imageUrl}
                    alt="medicine image"
                    width={160}
                    height={160}
                    className="object-contain w-auto h-full rounded shadow"
                />
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
                <h3 className="text-[15px] max-400px:text-[10px] sm:text-[14px] md:text-[16px] font-semibold">
                    {name}
                </h3>
                <p className="text-[13px] max-400px:text-[8px] sm:text-[12px] md:text-[14px] mt-1">
                    <span className="font-bold mr-2">${price}</span>
                    <sup className="line-through text-red-500 font-semibold">
                        ${estimatedPrice}
                    </sup>
                </p>
                <Link
                    className="w-full text-center p-1 rounded-md text-black dark:text-white font-semibold max-400px:text-[10px] text-[13px] sm:text-[12px] md:text-[14px] hover:shadow-md shadow-black transition-shadow duration-300 border dark:border-transparent dark:bg-colors-mainBackground"
                    href={itemLocation}
                >
                    Add to Cart
                </Link>
            </div>
        </div>
    );
};

export default MedicineCard;
