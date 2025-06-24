/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import Link from "next/link";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import tempImage from "@/public/images/SurbexZ_pic.png";
import Image from "next/image";
import Heading from "@/app/utils/Heading";

interface IOrderdMedicineOptions {
    medicineName: string;
    medicineDescription: string;
    medicinePictureUrl: string;
    packPrice: number;
    packQuantity: number;
}

const Page = () => {
    const discount: number = 3;
    const platformFee = 29;
    const deliveryCharges = 120;
    const [orderedMedicines, setOrderedMedicines] = useState<
        Array<IOrderdMedicineOptions>
    >([
        {
            medicineName: "Surbex-Z",
            medicineDescription:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem inventore officia, nostrum est maxime.",
            medicinePictureUrl: "someelse",
            packPrice: 130,
            packQuantity: 2,
        },
    ]);

    const handleMedicineQuntityChange = (
        isPlus: boolean,
        index: number,
        e: any
    ) => {
        e.stopPropagation();
        e.preventDefault();
        if (orderedMedicines[index].packQuantity < 2 && !isPlus) {
            return null;
        }

        const updatedData = [...orderedMedicines];
        if (isPlus) {
            updatedData[index].packQuantity += 1;
        } else {
            updatedData[index].packQuantity -= 1;
        }
        setOrderedMedicines(updatedData);
    };

    // SUMMARY STUFF -> START
    const calculateSubTotal = () => {
        return orderedMedicines.reduce(
            (acc, item) => (acc += item.packPrice * item.packQuantity),
            0
        );
    };

    const calculateDicount = () => {
        return (calculateSubTotal() * discount) / 100;
    };

    const calculateGrandTotal = () => {
        return (
            calculateSubTotal() -
            calculateDicount() +
            platformFee +
            deliveryCharges
        );
    };
    // SUMMARY STUFF -> END

    const handleRemoveMedicine = (index: number) => {
        const updatedData = [...orderedMedicines];
        updatedData.splice(index, 1);
        setOrderedMedicines(updatedData);
    };

    return (
        <div className="w-full flex max-800px:flex-col my-10 px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem] 800px:gap-12 max-800px:gap-4">
            <Heading
                title="EMedicine | Cart"
                description="EMedicine is online pharmacy provide medicine all over the pakistan with the best price."
                keyword="Medicine,Pharmacy,Online Pharmacy"
            />
            {/* left side */}
            <div className="w-full flex flex-col gap-6">
                <div>
                    <h2 className="text-[22px] font-bold">Cart</h2>
                    <div className="flex items-center gap-2">
                        <p>Home</p>
                        <MdKeyboardArrowRight />
                        <p>Pharmacy</p>
                        <MdKeyboardArrowRight />
                        <p>Cart</p>
                    </div>
                </div>
                <div>
                    <p className="text-[#248564] font-semibold">
                        Deliver Around 48 - 72 hours
                    </p>
                    {/* seperator */}
                    <div className="w-full border border-transparent border-b border-b-gray-400" />
                </div>

                {orderedMedicines.length > 0 ? (
                    <div className="w-full bg-colors-mainBackground border rounded-md shadow-md px-4 py-2">
                        <h1 className="text-[22px] font-semibold text-black dark:text-white">
                            Medicines & Other Products :{" "}
                            {orderedMedicines.length} items
                        </h1>
                        <div className="w-full h-[1px] bg-gray-500 my-2" />
                        {orderedMedicines.map((item, index) => (
                            <div key={index}>
                                {/* upper section */}
                                <div className="flex w-full max-800px:flex-col-reverse rounded-md shadow-md p-2 border">
                                    {/* pic + name + description */}
                                    <div className="w-full flex flex-[3] gap-2 max-1000px:flex-col">
                                        <div className="w-full h-[10rem] bg-green-600 rounded-md">
                                            <Image
                                                src={tempImage}
                                                alt="order_medicine_pic"
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h2 className="font-semibold text-[22px] text-colors-dark dark:text-colors-accent">
                                                {item.medicineName}
                                            </h2>
                                            <p className="text-colors-dark dark:text-colors-accent">
                                                {item.medicineDescription}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-[1] flex-col max-800px:justify-between max-800px:flex-row-reverse gap-2 w-full p-2">
                                        <div
                                            onClick={() => {
                                                handleRemoveMedicine(index);
                                            }}
                                            className="w-full flex cursor-pointer items-center justify-center py-1 rounded-md border transition-shadow  hover:shadow-red-600 shadow-md text-red-600 text-center font-medium"
                                        >
                                            <BsTrash className="text-[18px]" />
                                        </div>
                                        <p className="max-800px:hidden w-full py-[2px] rounded-md border text-black text-center font-medium shadow-md">
                                            Quantity
                                        </p>
                                        <div className="flex items-center justify-around w-full ">
                                            <AiOutlineMinusSquare
                                                className="text-[22px] hover:text-red-600 transition-colors duration-300 cursor-pointer"
                                                onClick={(e: any) => {
                                                    handleMedicineQuntityChange(
                                                        false,
                                                        index,
                                                        e
                                                    );
                                                }}
                                            />
                                            <input
                                                type="number"
                                                value={item.packQuantity}
                                                className="w-5 border rounded-md bg-colors-mainBackground text-center dark:text-white text-black shadow-md"
                                                onChange={(e) => {
                                                    if (
                                                        orderedMedicines[index]
                                                            .packQuantity < 2 &&
                                                        Number.parseInt(
                                                            e.target.value
                                                        ) < 2
                                                    ) {
                                                        return null;
                                                    }

                                                    const updatedData = [
                                                        ...orderedMedicines,
                                                    ];
                                                    updatedData[
                                                        index
                                                    ].packQuantity =
                                                        Number.parseInt(
                                                            e.target.value
                                                        );
                                                    setOrderedMedicines(
                                                        updatedData
                                                    );
                                                }}
                                            />
                                            <AiOutlinePlusSquare
                                                className="text-[22px] hover:text-green-600 cursor-pointer transition-colors duration-300"
                                                onClick={(e: any) => {
                                                    handleMedicineQuntityChange(
                                                        true,
                                                        index,
                                                        e
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* lower section */}
                                <div className="w-full flex items-center justify-between max-800px:flex-wrap py-2">
                                    {/* pack price */}
                                    <div>
                                        <p className="text-[16px] font-semibold">
                                            Pack Price : {item.packPrice}
                                        </p>
                                    </div>
                                    {/* pack quantiy */}
                                    <div>
                                        <p className="text-[16px] font-semibold">
                                            Pack Quantity : {item.packQuantity}
                                        </p>
                                    </div>
                                    {/* total price of that pack*/}
                                    <div>
                                        <p className="text-[16px] font-semibold">
                                            Total :{" "}
                                            {item.packPrice * item.packQuantity}{" "}
                                        </p>
                                    </div>
                                </div>

                                {orderedMedicines.length !== index + 1 && (
                                    <div className="w-full h-[1px] bg-gray-600 my-2" />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    // if there is no medicines ordered
                    <div className="w-full flex items-center justify-center flex-col gap-2">
                        <IoIosCart className="w-[40%] h-full text-colors-mainBackground drop-shadow-md shadow-black" />
                        <p>No medicine added to the cart yet</p>
                        <Link
                            href={"#"}
                            className="border rounded-md shadow-md px-2 py-1 font-semibold hover:shadow-colors-secondary transition-shadow duration-300"
                        >
                            Add Medicine Now
                        </Link>
                    </div>
                )}
            </div>
            {/* right side */}
            <div className="w-full h-full rounded-md flex flex-col gap-2">
                <div className="flex flex-col bg-[#868db44c] p-3 rounded-md shadow-md border dark:border-transparent hover:scale-[1.01] transition-transform duration-300">
                    <div>
                        <h2 className="py-4 text-colors-dark font-bold dark:text-white">
                            Summary
                        </h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Total Cost</p>
                        <p>Rs: {calculateSubTotal().toFixed(2)}</p>
                    </div>
                </div>
                <div className="rounded-md shadow-md border dark:border-transparent hover:scale-[1.01] transition-transform duration-300">
                    <div className="flex items-center justify-between bg-[#868db44c] p-3 rounded-t-md">
                        <p>Discount Applied</p>
                        <p>
                            {discount}% : {calculateDicount().toFixed(2)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between bg-[#868db44c] p-3 rounded-b-md">
                        <p>Platform Fee</p>
                        {/* platform fee will dynamic, setted by the admin from the dashboard */}
                        <p>Rs: {platformFee}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-[#868db44c] p-3 rounded-md shadow-md border dark:border-transparent hover:scale-[1.01] transition-transform duration-300">
                    <p>Deliver Charges</p>
                    {/* Delivery charges will be based on location */}
                    <p>Rs: {deliveryCharges}</p>
                </div>
                <div className="flex gap-4 flex-col bg-[#868db44c] p-3 rounded-md shadow-md border dark:border-transparent hover:scale-[1.01] transition-transform duration-300">
                    <div className="flex items-center justify-between">
                        <p>Grand Total</p>
                        <p>Rs: {calculateGrandTotal().toFixed(2)}</p>
                    </div>
                    <div className="w-full">
                        <button className="w-full py-1 rounded-md shadow-md border dark:border-transparent transition-colors duration-300 font-medium dark:bg-colors-mainBackground">
                            Review Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
