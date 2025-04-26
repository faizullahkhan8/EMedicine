"use client";
import NeedHelp from "@/app/utils/NeedHelp";
import Link from "next/link";
import React, { useRef, useState } from "react";

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
            <div className="w-full flex items-center justify-center flex-col my-4 px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem]">
                <div className="w-full flex flex-col gap-4 border shadow-sm dark:shadow-colors-accent border-colors-accent rounded px-8 800px:pr-[8rem]   bg-colors-accent dark:bg-black py-4">
                    <div>
                        <p className="text-colors-dark dark:text-white  font-semibold text-[24px] mb-2">
                            Register for Free
                        </p>
                        <p className="text-colors-dark dark:text-white">
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
                                className={`w-[50px] h-[50px] bg-transparent border-[1px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
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
                    <div>
                        <p className="text-red-600 font-semibold">
                            This is an Error
                        </p>
                    </div>
                    <Link href={"/verification"} className="place-self-start">
                        <button className="w-[10rem] border rounded border-colors-dark p-1 outline-none dark:text-white text-colors-dark font-semibold text-[16px] bg-transparent hover:bg-colors-secondary hover:text-white">
                            Verify
                        </button>
                    </Link>
                </div>
            </div>
            {/* Need help component */}
            <NeedHelp />
        </div>
    );
};

export default Verification;
