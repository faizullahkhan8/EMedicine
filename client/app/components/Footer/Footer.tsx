import Link from "next/link";
import React from "react";
import { BiCopyright, BiLogoAndroid, BiLogoApple } from "react-icons/bi";
import {
    BsFacebook,
    BsInstagram,
    BsTwitterX,
    BsWhatsapp,
} from "react-icons/bs";
import FooterLinks from "./subComponents/FooterLinks";
import Image from "next/image";

const Footer = () => {
    const date = new Date();
    return (
        <div>
            <div className="py-4 flex flex-col justify-between px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem] dark:bg-colors-mainBackground bg-colors-mainBackground max-800px:gap-4 border dark:border-transparent">
                <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-2 ">
                        <div className="w-max h-full]">
                            <Image
                                src="/favicon.ico.png"
                                alt="logo"
                                width={100}
                                height={42}
                                className="w-[70px] h-[80px] rounded object-cover"
                            />
                        </div>
                        <div className="font-bold text-[18px] max-800px:text-[14px] dark:text-colors-accent text-colors-primary">
                            Target Pain,<p> Not the Patient.</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center justify-center gap-2 rounded-md p-1 shadow-lg hover:scale-[1.03] transition-transform duration-300 border dark:border-transparent dark:bg-colors-mainBackground">
                            <div className="max-400px:hidden">
                                <BiLogoAndroid className="text-colors-dark text-[24px] max-400px:hidden dark:text-colors-secondary" />
                            </div>
                            <div>
                                <p className="text-colors-dark text-[12px] dark:text-white">
                                    Download for the
                                </p>
                                <p className="text-colors-secondary font-semibold text-[16px]">
                                    Android
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 rounded-md p-1 shadow-lg hover:scale-[1.03] transition-transform duration-300 border dark:border-transparent dark:bg-colors-mainBackground">
                            <div>
                                <BiLogoApple
                                    size={24}
                                    className="text-colors-dark text-[24px] max-400px:hidden dark:text-colors-secondary"
                                />
                            </div>
                            <div>
                                <p className="text-colors-dark text-[12px] dark:text-white">
                                    Download for the
                                </p>
                                <p className="text-colors-secondary font-semibold text-[16px]">
                                    Apple
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Links Starts */}

                <FooterLinks />

                {/* Links Ends */}
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <BiCopyright className="dark:text-colors-accent text-colors-dark" />
                        <p className="dark:text-colors-accent text-colors-dark">
                            EMedicine {date.getFullYear()}{" "}
                            <Link
                                href={""}
                                className="text-colors-dark dark:text-colors-accent underline"
                            >
                                Terms
                            </Link>{" "}
                            <Link
                                href={""}
                                className="text-colors-dark dark:text-colors-accent underline"
                            >
                                Privacy
                            </Link>
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Link href={""}>
                            <BsFacebook className="text-colors-dark dark:text-colors-accent max-800px:text-[16px]" />
                        </Link>
                        <Link href={""}>
                            <BsWhatsapp className="text-colors-dark dark:text-colors-accent max-800px:text-[16px]" />
                        </Link>
                        <Link href={""}>
                            <BsInstagram className="text-colors-dark dark:text-colors-accent max-800px:text-[16px]" />
                        </Link>
                        <Link href={""}>
                            <BsTwitterX className="text-colors-dark dark:text-colors-accent max-800px:text-[16px]" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
