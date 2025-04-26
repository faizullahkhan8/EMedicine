import Link from "next/link";
import React from "react";

const FooterLinks = () => {
    const ColumnOneLinks = [
        { title: "Home", href: "#" },
        { title: "About Us", href: "#" },
        { title: "News", href: "#" },
        { title: "Blogs", href: "#" },
        { title: "Contect Us", href: "#" },
    ];
    const ColumnTwoLinks = [
        { title: "Dermatologist", href: "#" },
        { title: "Neurologist", href: "#" },
        { title: "Cardiologist", href: "#" },
        { title: "Stomic", href: "#" },
        { title: "Skin", href: "#" },
        { title: "Orthopadic Surgen", href: "#" },
        { title: "Psycatrics", href: "#" },
        { title: "Urologist", href: "#" },
        { title: "Ear Nose Throat", href: "#" },
    ];
    const ColumnThreeLinks = [
        { title: "Blogs", href: "#" },
        { title: "Hospital", href: "#" },
        { title: "Labs", href: "#" },
        { title: "Pharmacy", href: "#" },
        { title: "A-to-Z Medicines", href: "#" },
        { title: "Doctors", href: "#" },
        { title: "Corporate Wellness", href: "#" },
    ];

    return (
        <div className="w-full flex items-start justify-start gap-8 py-4 flex-wrap ">
            <div className="flex flex-col items-start">
                <h2 className="font-semibold text-[20px] dark:text-white text-colors-primary py-2">
                    Company
                </h2>
                <div className="w-full flex justify-start flex-col">
                    {ColumnOneLinks.map((link, index) => {
                        return (
                            <Link
                                className="opacity-80 hover:opacity-100 text-[14px] text-colors-dark dark:text-colors-accent"
                                key={index}
                                href={link.href}
                            >
                                {link.title}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col items-start">
                <h2 className="font-semibold text-[20px] dark:text-white text-colors-primary py-2">
                    Top Specialists
                </h2>
                <div className="w-full flex justify-start flex-col">
                    {ColumnTwoLinks.map((link, index) => {
                        return (
                            <Link
                                className="opacity-80 hover:opacity-100 text-[14px] text-colors-dark dark:text-colors-accent"
                                key={index}
                                href={link.href}
                            >
                                {link.title}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col items-start">
                <h2 className="font-semibold text-[20px] dark:text-white text-colors-primary py-2">
                    Resources
                </h2>
                <div className="w-full flex justify-start flex-col">
                    {ColumnThreeLinks.map((link, index) => {
                        return (
                            <Link
                                className="opacity-80 hover:opacity-100 text-[14px] text-colors-dark dark:text-colors-accent"
                                key={index}
                                href={link.href}
                            >
                                {link.title}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FooterLinks;
