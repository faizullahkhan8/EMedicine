import CutomInput from "@/app/utils/CutomInput";
import NeedHelp from "@/app/utils/NeedHelp";
import React from "react";
import { BiSolidError } from "react-icons/bi";

const Login = () => {
    return (
        <div>
            <div className="w-full flex items-center justify-center flex-col my-4 px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem]">
                <div className="w-[70%] max-800px:w-[100%] flex flex-col gap-4 border dark:border-transparent shadow-md rounded-md px-8 800px:pr-[8rem] bg-colors-mainBackground dark:bg-colors-mainBackground py-4">
                    <div>
                        <p className="text-colors-dark dark:text-white  font-semibold text-[20px] mb-2">
                            Wellcome back!
                        </p>
                        <p className="text-colors-dark text-[14px] dark:text-white">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Incidunt sunt, ipsum aliquid ducimus dolore
                            exercitationem corporis, atque quia eaque ea dolores
                            quod nisi perferendis, nulla sapiente aperiam
                            veritatis consectetur. Dicta!
                        </p>
                    </div>
                    <div>
                        <CutomInput
                            type="text"
                            placeholder="Enter your name"
                            className="h-[2rem] max-800px:w-full max-1000px:w-[70%] w-[50%]"
                        />
                    </div>
                    <div>
                        <CutomInput
                            type="password"
                            placeholder="Enter your password"
                            className="h-[2rem] max-800px:w-full max-1000px:w-[70%] w-[50%]"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-300 font-semibold">
                        <BiSolidError className="text-[16px]" />
                        <p className=" text-[14px]">This is an Error</p>
                    </div>
                    <div className="place-self-start">
                        <button className="w-[10rem] border dark:border-transparent dark:bg-colors-mainBackground rounded-md p-1 outline-none dark:text-white text-colors-dark font-semibold text-[14px] shadow-md">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
            {/* Need help component */}
            <NeedHelp />
        </div>
    );
};

export default Login;
