import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

interface IItemOptions {
    imageUrl: string;
    title: string;
    subTitle: string;
    price: number;
    estimatedPrice: number;
    mainItemLocation: string;
}

interface IMedicineShowCaseGirdOptions {
    MiniTitle: string;
    Title: string;
    topOneItemIndex?: number;
    Items: IItemOptions[];
}

const MedicineShowCaseGird: FC<IMedicineShowCaseGirdOptions> = ({
    MiniTitle,
    Title,
    topOneItemIndex = 0,
    Items,
}) => {
    const topOneItem = Items[topOneItemIndex];
    const updatedData = Items.filter((_, index) => index !== topOneItemIndex);

    return (
        <>
            <div className="flex flex-col gap-2 w-[95%]">
                <div className="flex items-center justify-center flex-col">
                    <h2 className="dark:text-white text-colors-dark text-sm font-semibold">
                        {MiniTitle.toUpperCase()}
                    </h2>
                    <h3 className="dark:text-white text-black text-2xl font-bold mt-2">
                        {Title}
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 max-800px:grid-cols-1 ">
                    {/* Header Medicine */}
                    <div className="border dark:border-transparent rounded-md dark:bg-colors-mainBackground relative group shadow-md">
                        {/* VISIBLE ONLY ON HOVER */}
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#474c55c7] rounded-md group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                            <button className="rounded-md border dark:bg-colors-mainBackground dark:border-transparent shadow-md border-white p-2 text-white font-semibold">
                                View Product
                            </button>
                        </div>
                        {/* TOP ONE ITEM START */}
                        <div className="flex gap-2 flex-col">
                            <Image
                                src={topOneItem.imageUrl}
                                width={500}
                                height={500}
                                alt="sample_medicine"
                                className="rounded-lg w-full object-contain"
                            />

                            <div className="p-2">
                                <h2 className="font-bold text-[22px] dark:text-white">
                                    {topOneItem.title}
                                </h2>
                                <p className="text-sm text-gray-800 mt-1 text-[18px] dark:text-white">
                                    {topOneItem.subTitle}
                                </p>
                                <div className="flex justify-start gap-3">
                                    <p className="text-[16px] max-800px:text-[14px] mt-1">
                                        <span className="mr-2">
                                            {topOneItem.price.toFixed(2)}
                                        </span>
                                        <sup className="line-through text-red-500 font-semibold">
                                            $
                                            {topOneItem.estimatedPrice.toFixed(
                                                2
                                            )}
                                        </sup>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Medicines */}
                    <div className="w-full gap-6 grid grid-cols-2">
                        {updatedData.map((item, index: number) => (
                            <div
                                key={index}
                                className="border dark:border-transparent flex w-full rounded-md dark:bg-colors-mainBackground relative group shadow-md"
                            >
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#474c55c7] rounded-md group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                                    <Link
                                        href={`/pharmacy/medicine/${item.title}`}
                                        className="rounded-md border dark:bg-colors-mainBackground dark:border-transparent shadow-md border-white p-2 text-white font-semibold"
                                    >
                                        View Product
                                    </Link>
                                </div>
                                <div>
                                    <Image
                                        src={item.imageUrl}
                                        width={500}
                                        height={500}
                                        alt="sample_medicine"
                                        className="rounded w-full h-max object-cover"
                                    />

                                    <div className="p-2">
                                        <h4 className="max-800px:text-[14px] font-Poppins mt-2 font-bold">
                                            {item.title.toUpperCase()}
                                        </h4>
                                        <div className="flex justify-start gap-3">
                                            <p className="text-[14px] font-semibold max-800px:text-[12px] mt-1">
                                                <span className="mr-2">
                                                    {item.price.toFixed(2)}
                                                </span>
                                                <sup className="line-through text-red-500">
                                                    $
                                                    {item.estimatedPrice.toFixed(
                                                        2
                                                    )}
                                                </sup>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="my-3 w-full flex items-center justify-end gap-1">
                <Link href="#">Show All Online Pharmacies</Link>
                <MdKeyboardArrowRight />
            </div>
        </>
    );
};

export default MedicineShowCaseGird;
