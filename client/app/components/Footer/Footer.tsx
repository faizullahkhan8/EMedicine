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

const Footer = () => {
    const date = new Date();
    return (
        <div>
            <div className="py-4 flex flex-col justify-between px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem] dark:bg-colors-dark bg-colors-accent max-800px:gap-4">
                <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-2 ">
                        <div className="font-bold dark:text-colors-accent">
                            Logo
                        </div>
                        <div className="font-bold text-[18px] max-800px:text-[14px] dark:text-colors-accent text-colors-primary">
                            Target Pain,<p> Not the Patient.</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center justify-center gap-2 border dark:border-colors-accent border-colors-dark rounded-md p-1 bg-colors-secondary">
                            <div>
                                <BiLogoAndroid className="text-colors-dark text-[24px]" />
                            </div>
                            <div>
                                <p className="text-colors-dark text-[12px]">
                                    Download for the
                                </p>
                                <p className="text-colors-dark font-semibold text-[16px]">
                                    Android
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 border dark:border-colors-accent border-colors-dark rounded-md p-1 bg-colors-secondary">
                            <div>
                                <BiLogoApple
                                    size={24}
                                    className="text-colors-dark text-[24px]"
                                />
                            </div>
                            <div>
                                <p className="text-colors-dark text-[12px]">
                                    Download for the
                                </p>
                                <p className="text-colors-dark font-semibold text-[16px]">
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
