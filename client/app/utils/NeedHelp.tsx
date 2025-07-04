import Link from "next/link";
import React from "react";
import { MdHelp } from "react-icons/md";

const NeedHelp = () => {
    return (
        <div className="w-full flex items-center justify-center py-2">
            <div className="w-[30%] max-800px:w-[80%] max-1000px:w-[40%] flex items-center justify-center my-2 border dark:border-transparent bg-colors-mainBackground rounded-md shadow-md gap-2">
                <div className="max-800px:w-[20rem] w-[10rem] flex items-center justify-center">
                    <MdHelp
                        size={100}
                        className="dark:text-colors-secondary text-colors-primary"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col gap-1 py-2">
                        <div>
                            <h3 className="font-semibold dark:text-white text-colors-primary text-[18px]">
                                Need help?
                            </h3>
                        </div>
                        <div>
                            <p className="text-[12px] dark:text-white text-colors-dark">
                                If you face any issue,feel free to contact us.
                                We provide 24 / 7 support to assist to problems.
                            </p>
                        </div>
                        <div className="border dark:border-none dark:bg-colors-mainBackground hover:shadow-md transition-shadow duration-300 place-self-start p-2 rounded-md hover:text-white ">
                            <Link href={""}>
                                <p className="text-[14px] font-semibold dark:text-white text-colors-dark">
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
