import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { links } from "./RandomData";
import Button from "./CustomButton";
import Link from "next/link";
import { useParams } from "next/navigation";

const AllCategories = () => {
    const params = useParams();
    // If using a catch-all route, category will be an array
    const categoryPath = Array.isArray(params.category)
        ? params.category
        : [params.category];

    // Find the active main category
    const activeCategory = links.find(
        (link) =>
            link.targetUrl === categoryPath?.[0] ||
            link.header.toLowerCase() === categoryPath?.[0]?.toLowerCase()
    );

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Categories */}
            <div className="relative w-full">
                <Button
                    variant="transparant"
                    type="button"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 !rounded-full shadow p-1 flex items-center justify-center"
                    onClick={() => {
                        const container = document.getElementById(
                            "main-category-scroll"
                        );
                        if (container)
                            container.scrollBy({
                                left: -150,
                                behavior: "smooth",
                            });
                    }}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft className="text-[12px]" />
                </Button>
                <div
                    id="main-category-scroll"
                    className="hide-scrollbar-mobile flex max-w-[100vw] gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent whitespace-nowrap py-1 scroll-smooth"
                >
                    {links.map((link, index) => {
                        const isActive =
                            link.targetUrl === categoryPath?.[0] ||
                            link.header.toLowerCase() ===
                                categoryPath?.[0]?.toLowerCase();

                        return (
                            <Link
                                href={`/pharmacy/${link.targetUrl}`}
                                key={index}
                                className="whitespace-nowrap"
                            >
                                <Button
                                    variant="background"
                                    className={
                                        (isActive
                                            ? "bg-blue-500 text-white "
                                            : "") +
                                        " text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-semibold px-3 py-2 min-w-[120px] !rounded-full"
                                    }
                                >
                                    {link.header}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
                <Button
                    variant="transparant"
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 !rounded-full shadow p-1 flex items-center justify-center"
                    onClick={() => {
                        const container = document.getElementById(
                            "main-category-scroll"
                        );
                        if (container)
                            container.scrollBy({
                                left: 150,
                                behavior: "smooth",
                            });
                    }}
                    aria-label="Scroll right"
                >
                    <FaChevronRight className="text-[12px]" />
                </Button>
            </div>
            {/* Subcategories */}
            <div className="relative w-full">
                <Button
                    variant="transparant"
                    type="button"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 !rounded-full shadow p-1 flex items-center justify-center"
                    onClick={() => {
                        const container = document.getElementById(
                            "sub-category-scroll"
                        );
                        if (container)
                            container.scrollBy({
                                left: -150,
                                behavior: "smooth",
                            });
                    }}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft className="text-[12px]" />
                </Button>
                <div
                    id="sub-category-scroll"
                    className="hide-scrollbar-mobile flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent whitespace-nowrap py-1 scroll-smooth"
                >
                    {activeCategory?.listItems?.map((sub, idx) => {
                        const isSubActive =
                            sub.toLowerCase().replace(/\s+/g, "-") ===
                            categoryPath?.[1]?.toLowerCase();

                        return (
                            <Link
                                href={`/pharmacy/${
                                    activeCategory.targetUrl
                                }/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                                key={idx}
                                className="whitespace-nowrap"
                            >
                                <Button
                                    variant="background"
                                    className={
                                        (isSubActive
                                            ? "bg-blue-500 text-white "
                                            : "") +
                                        " text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-semibold px-3 py-2 min-w-[110px] !rounded-full"
                                    }
                                >
                                    {sub}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
                <Button
                    variant="transparant"
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 !rounded-full shadow p-1 flex items-center justify-center"
                    onClick={() => {
                        const container = document.getElementById(
                            "sub-category-scroll"
                        );
                        if (container)
                            container.scrollBy({
                                left: 150,
                                behavior: "smooth",
                            });
                    }}
                    aria-label="Scroll right"
                >
                    <FaChevronRight className="max-800px:text-[12px]" />
                </Button>
            </div>
        </div>
    );
};

export default AllCategories;
