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
    let updatedData = [...Items];
    updatedData = updatedData.filter(
        (value, index) => index !== topOneItemIndex
    );

    const topOneItem = Items[topOneItemIndex];

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
                    <div className="border rounded-lg dark:bg-transparent relative group shadow-md">
                        {/* VISIBLE ONLY ON HOVER */}
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#474c55c7] rounded-lg group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                            <button className="rounded-lg border-[1px] border-white p-2 text-white font-bold">
                                View Product
                            </button>
                        </div>
                        {/* TOP ONE ITEM START */}
                        <div className="flex gap-2 flex-col">
                            <div className="w-full h-full">
                                <Image
                                    src={topOneItem.imageUrl}
                                    width={500}
                                    height={500}
                                    alt="sample_medicine"
                                    className="rounded-lg w-full object-contain"
                                />
                            </div>
                            <div className="p-2">
                                <h2 className="font-bold text-[22px] font-mono dark:text-white">
                                    {topOneItem.title}
                                </h2>
                                <p className="text-sm text-gray-800 mt-1 text-[18px] dark:text-white">
                                    {topOneItem.subTitle}
                                </p>
                                <div className="flex justify-start gap-3">
                                    <p className="dark:text-white text-black font-bold text-[18px]">
                                        <span>Rs:</span> {topOneItem.price}
                                    </p>
                                    <p className="line-through text-red-500 text-sm font-semibold text-[12px] ">
                                        <span>Rs:</span>{" "}
                                        {topOneItem.estimatedPrice}
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
                                className="border flex w-full rounded dark:bg-transparent relative group shadow-md"
                            >
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#474c55c7] rounded-lg group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                                    <button className="rounded-lg border-[1px] border-white p-2 text-white font-semibold">
                                        View Product
                                    </button>
                                </div>
                                <div>
                                    <div>
                                        <Image
                                            src={item.imageUrl}
                                            width={500}
                                            height={500}
                                            alt="sample_medicine"
                                            className="rounded w-full object-contain"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <h4 className="font-bold max-800px:text-[14px] mt-2">
                                            {item.title.toUpperCase()}
                                        </h4>
                                        <div className="flex justify-start gap-3">
                                            <p className="dark:text-white text-black font-bold max-800px:text-[14px] text-[16px]">
                                                <span>Rs:</span> {item.price}
                                            </p>
                                            <p className="line-through text-red-500 text-sm font-semibold text-[12px] max-800px:text-[10px]">
                                                <span>Rs:</span>{" "}
                                                {item.estimatedPrice}
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
