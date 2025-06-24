"use client";
import Heading from "@/app/utils/Heading";
import NeedHelp from "@/app/utils/NeedHelp";
import React, { useRef, useState } from "react";
import { BiSolidError } from "react-icons/bi";

interface IVerificationNumber {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification = () => {
    const [invalidError, setInvalidError] = useState<boolean>(false);

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [verifyNumber, setVerifyNumber] = useState<IVerificationNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    });

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    return (
        <div>
            <Heading
                title="EMedicine | Verification"
                description="EMedicine is online pharmacy provide medicine all over the pakistan with the best price."
                keyword="Medicine,Pharmacy,Online Pharmacy"
            />
            <div className="w-full flex items-center justify-center flex-col my-4 px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem]">
                <div className="w-[70%] max-800px:w-full flex flex-col gap-4 border dark:border-transparent shadow-md rounded-md px-8 800px:pr-[8rem] bg-colors-mainBackground py-4">
                    <div>
                        <p className="text-colors-dark dark:text-white  font-semibold max-800px:text-[18px] text-[24px] mb-2">
                            Register for Free
                        </p>
                        <p className="text-colors-dark dark:text-white text-[16px] max-800px:text-[14px]">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Incidunt sunt, ipsum aliquid ducimus dolore
                            exercitationem corporis, atque quia eaque ea dolores
                            quod nisi perferendis, nulla sapiente aperiam
                            veritatis consectetur. Dicta!
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        {Object.keys(verifyNumber).map((key, index) => (
                            <input
                                type="number"
                                key={key}
                                ref={inputRefs[index]}
                                className={`w-[50px] h-[50px] border dark:border-transparent dark:bg-colors-mainBackground rounded-md p-1 outline-none dark:text-white text-colors-dark font-semibold text-[14px] shadow-md${
                                    invalidError
                                        ? "shake border-red-500"
                                        : "dark:border-white border-[#0000004a]"
                                }`}
                                placeholder=""
                                maxLength={1}
                                value={
                                    verifyNumber[
                                        key as keyof IVerificationNumber
                                    ]
                                }
                                onChange={(e) =>
                                    handleInputChange(index, e.target.value)
                                }
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-300 font-semibold">
                        <BiSolidError className="text-[16px]" />
                        <p className=" text-[14px]">This is an Error</p>
                    </div>
                    <div className="place-self-start">
                        <button className="w-[10rem] border dark:border-transparent dark:bg-colors-mainBackground rounded-md p-1 outline-none dark:text-white text-colors-dark font-semibold text-[14px] shadow-md">
                            Verify OTP
                        </button>
                    </div>
                </div>
            </div>
            {/* Need help component */}
            <NeedHelp />
        </div>
    );
};

export default Verification;
