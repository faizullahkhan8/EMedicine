"use client";
import Button from "@/app/utils/CustomButton";
import Heading from "@/app/utils/Heading";
import { MedicineInformationData } from "@/app/utils/RandomData";
import ShowLocationHerarchy from "@/app/utils/ShowLocationHerarchy";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsHouseFill, BsStarFill, BsStarHalf } from "react-icons/bs";
import { IoMdFlask } from "react-icons/io";

const page = () => {
    return (
        <div className="my-10 px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem] scroll-smooth">
            <Heading
                title={`Medicine Details | ${MedicineInformationData.title}`}
                description="View detailed information about the medicine, including its generic name, manufacturer, ratings, and more."
                keyword="medicine details, medicine information, pharmacy, healthcare, eMedicine"
            />
            <div>
                <ShowLocationHerarchy />
            </div>
            {/* product details */}
            <div className="flex max-800px:flex-col gap-6 my-4">
                {/* image */}
                <div className="w-max max-800px:w-full">
                    <Image
                        src={"/images/Burofen_pic.png"}
                        alt=""
                        width={300}
                        height={400}
                        className="object-cover w-full h-[400px] rounded-md"
                    />
                </div>
                {/* product names etc */}
                <div className="flex-1 flex flex-col justify-between gap-2 h-[400px]">
                    <h1 className="text-[24px] font-bold text-colors-dark dark:text-white">
                        Burofen
                    </h1>
                    {/* instock / orders in 7 days */}
                    <div className="flex gap-2">
                        <p className="w-max p-1 rounded text-[12px] bg-green-500/30 ">
                            In Stock
                        </p>
                        <p className="w-max p-1 rounded text-[12px] bg-green-500/30">
                            200 successfull orders delivered in last 7 days
                        </p>
                    </div>
                    {/* generic Name */}
                    <div className="flex flex-col gap-3">
                        <div className="flex">
                            <div className="flex items-center gap-2">
                                <BsHouseFill className="dark:text-white " />
                                <p className="text-[14px]">Manufacturer : </p>
                            </div>
                            <div>
                                <p className="text-[14px]">
                                    AVENTIS PHARMACEUTICALS (PVT.) LTD.
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex items-center gap-2">
                                <IoMdFlask className="dark:text-white " />
                                <p className="text-[14px]">Generic Name : </p>
                            </div>
                            <div>
                                <p className="text-[14px]">Ibuprofen</p>
                            </div>
                        </div>
                    </div>
                    {/* Ratings */}
                    <hr />
                    <div>
                        <p className="text-red-400/80">
                            EMedicine Pharmacy Ratings and Reviews (500+)
                        </p>
                        {/* [TODO]: add rating stars lib */}
                        <div className="flex gap-1 items-center">
                            <div className="flex gap-1 text-yellow-500">
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarFill />
                                <BsStarHalf />
                            </div>
                            <p className="text-[12px]">
                                <span className="font-semibold">4.9</span>/5
                            </p>
                        </div>
                    </div>
                    <hr className="max-800px:hidden" />
                    {/* pricing */}
                    <div className="max-800px:p-4 max-800px:bg-colors-mainBackground/100 w-full left-0 bottom-0 max-800px:fixed flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="text-[14px]">Rs. 120.0</p>
                            <sup className="text-[11px] line-through">
                                Rs. 100.0
                            </sup>
                            {/* is Off only show */}
                            <div className="rounded-md p-1 bg-red-500/50 text-[12px] text-white font-semibold">
                                10% OFF
                            </div>
                        </div>
                        <p>Delivered in ARound 48 - 72 hours</p>
                        <Button
                            variant="background"
                            className="w-[10rem] max-800px:w-full max-800px:bg-colors-dark max-800px:text-white"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
            <hr />
            {/* product information */}
            <div className="">
                {/* information nav */}
                <div className="flex flex-wrap gap-2 my-4">
                    {Object.keys(MedicineInformationData).map(
                        (NavItem, index) => (
                            <Link key={index} href={`#${NavItem}`}>
                                <Button variant="background">
                                    {NavItem.replace(/([A-Z])/g, " $1").replace(
                                        /^./,
                                        (str) => str.toUpperCase()
                                    )}
                                </Button>
                            </Link>
                        )
                    )}
                </div>
                <hr />
                {/* information */}
                <div className="flex flex-col my-4">
                    {Object.entries(MedicineInformationData).map(
                        ([key, value], idx) => (
                            <div
                                id={key}
                                key={idx}
                                className="mb-4 scroll-mt-[7rem]"
                            >
                                <h2 className="font-bold text-lg mb-1">
                                    {key
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) =>
                                            str.toUpperCase()
                                        )}
                                </h2>
                                {Array.isArray(value) ? (
                                    <ul className="list-disc ml-6">
                                        {value.map((item, i) => (
                                            <li key={i} className="text-[15px]">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-[15px]">{value}</p>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;
