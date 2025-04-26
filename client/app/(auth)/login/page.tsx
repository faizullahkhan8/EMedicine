import CutomInput from "@/app/utils/CutomInput";
import NeedHelp from "@/app/utils/NeedHelp";
import React from "react";

const Login = () => {
    return (
        <div>
            <div className="w-full flex items-center justify-center flex-col my-4 px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem]">
                <div className="w-full flex flex-col gap-4 border shadow-sm dark:shadow-colors-accent border-colors-accent rounded px-8 800px:pr-[8rem]   bg-colors-accent dark:bg-black py-4">
                    <div>
                        <p className="text-colors-dark dark:text-white  font-semibold text-[24px] mb-2">
                            Wellcome back!
                        </p>
                        <p className="text-colors-dark dark:text-white">
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
                            className="h-[3rem] max-800px:w-full max-1000px:w-[70%] w-[60%]"
                        />
                    </div>
                    <div>
                        <CutomInput
                            type="password"
                            placeholder="Enter your password"
                            className="h-[3rem] max-800px:w-full max-1000px:w-[70%] w-[60%]"
                        />
                    </div>
                    <div>
                        <p className="text-red-600 font-semibold">
                            This is an Error
                        </p>
                    </div>
                    <div className="place-self-start">
                        <button className="w-[10rem] border rounded border-colors-dark p-1 outline-none dark:text-white text-colors-dark font-semibold text-[16px] bg-transparent hover:bg-colors-secondary hover:text-white">
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
