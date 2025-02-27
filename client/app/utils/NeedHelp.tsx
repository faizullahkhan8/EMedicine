import Link from "next/link";
import React from "react";
import { MdHelp } from "react-icons/md";

const NeedHelp = () => {
    return (
        <div className="w-full flex items-center justify-center py-2">
            <div className="w-[30%] max-800px:w-[50%] max-1000px:w-[40%] flex items-center justify-center my-2 border border-colors-dark rounded shadow-md shadow-black gap-2">
                <div className="max-800px:w-[20rem] w-[10rem] flex items-center justify-center">
                    <MdHelp size={100} className="text-colors-primary" />
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col gap-1 py-2">
                        <div>
                            <h3 className="font-semibold text-colors-primary text-[18px]">
                                Need help?
                            </h3>
                        </div>
                        <div>
                            <p className="text-[12px]">
                                If you face any issue,feel free to contact us.
                                We provide 24 / 7 support to assist to problems.
                            </p>
                        </div>
                        <div className="border border-colors-dark place-self-start p-2 rounded hover:bg-colors-secondary hover:text-white ">
                            <Link href={""}>
                                <p className="text-[14px] font-semibold">
                                    Call 033xxxxxxxx
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeedHelp;
