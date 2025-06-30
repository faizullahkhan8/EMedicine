import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/utils/CustomButton";

type Props = {
    title?: string;
    subTitle?: string;
    Images: ISliderImageOptions[];
};

export interface ISliderImageOptions {
    imageUrl: string;
    medicineName: string;
    percentageOff: number;
    price: number;
    estimatedPrice: number;
    mainItemLocation: string;
}

const ImageSlider = ({ title, subTitle, Images }: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = 260; // Adjust to card width + gap
        el.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <div className="my-8 relative w-full">
            <h2 className="text-[24px] font-bold max-800px:text-[18px]">
                {title}
            </h2>
            <p className="text-[18] max-800px:text-[14px]">
                {subTitle && subTitle}
            </p>
            {/* Left Arrow */}
            <Button
                variant="background"
                type="button"
                className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-[1] bg-white/80 dark:bg-slate-800/80 !rounded-full shadow p-1"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
            >
                <FaChevronLeft className="text-2xl max-md:text-xl max-500px:text-base max-400px:text-sm" />
            </Button>
            <div
                ref={scrollRef}
                className="flex justify-between pb-8 pt-2 px-1 gap-6 w-full h-full overflow-x-auto hide-scrollbar-mobile scroll-smooth"
            >
                {Images.map((image, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-max h-full relative shadow-lg rounded p-[10px] border dark:bg-colors-mainBackground dark:border-transparent"
                    >
                        <div className="absolute rounded-lg w-[4rem] h-8 p-2 top-2 right-2 bg-red-500 text-white flex items-center justify-center font-semibold">
                            <p className="text-[12px]">
                                {image.percentageOff}% OFF
                            </p>
                        </div>
                        <Image
                            src={image.imageUrl}
                            alt={`slide-${index}`}
                            width={200}
                            height={200}
                            className="object-cover w-full h-[10rem] rounded shadow"
                        />
                        <div className="w-full flex justify-start flex-col gap-2">
                            <h3 className="text-[16px] max-800px:text-[14px] font-semibold mt-2">
                                {image.medicineName}
                            </h3>
                            <p className="text-[14px] max-800px:text-[12px] mt-1">
                                <span className="font-bold mr-2">
                                    {image.price.toFixed(2)}
                                </span>
                                <sup className="line-through text-red-500 font-semibold">
                                    ${image.estimatedPrice.toFixed(2)}
                                </sup>
                            </p>
                            <Link
                                className="w-full text-center p-1 rounded-md text-black dark:text-white font-semibold text-[14px] hover:shadow-md shadow-black transition-shadow duration-300 border dark:border-transparent dark:bg-colors-mainBackground"
                                href={image.mainItemLocation}
                            >
                                Add to Cart
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* Right Arrow */}
            <Button
                variant="background"
                type="button"
                className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-[1] bg-white/80 dark:bg-slate-800/80 !rounded-full shadow p-1"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
            >
                <FaChevronRight className="text-2xl max-md:text-xl max-500px:text-base max-400px:text-sm" />
            </Button>
        </div>
    );
};

export default ImageSlider;
