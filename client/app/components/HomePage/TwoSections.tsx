import Image from "next/image";
import React from "react";
import { MdArrowForward } from "react-icons/md";

interface TwoSectionsProps {
    TopTitle: string;
    items: Array<{
        imageUrl: string;
        title: string;
        description: string;
    }>;
}

const TwoSections = ({ TopTitle, items }: TwoSectionsProps) => {
    return (
        <div className="w-full flex justify-center flex-col my-4">
            <div>
                <h2 className="font-semibold max-800px:text-[18px] text-[24px]">
                    {TopTitle}
                </h2>
            </div>

            <div className="grid grid-cols-2 max-800px:grid-cols-1 gap-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="border flex gap-2 my-2 shadow-md dark:shadow-none rounded-md max-800px:flex-col-reverse dark:bg-colors-mainBackground dark:border-transparent"
                    >
                        {/* info section */}
                        <div className="w-[50%] max-800px:w-[80%] flex flex-col p-2 justify-between">
                            <div>
                                <p className="text-[18px] max-800px:text-[16px] font-semibold">
                                    {item.title}
                                </p>
                                <p className="max-800px:text-[14px]">
                                    {item.description}
                                </p>
                            </div>
                            <div>
                                <MdArrowForward className="text-[28px] hover:translate-x-3 transition-transform hover:text-blue-700 dark:hover:text-blue-300 duration-500" />
                            </div>
                        </div>
                        {/* image section */}
                        <div className="w-full h-full">
                            <Image
                                src={item.imageUrl}
                                alt=""
                                width={400} // or any custom width
                                height={0} // height will be auto-calculated
                                className="w-full h-full rounded-md object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TwoSections;
