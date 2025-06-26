import Link from "next/link";
import React from "react";

interface IAccountInformationProps {
    title: string;
    description?: string;
    items: Array<{
        icon: React.ReactNode;
        innerTitle: string;
        innerDescription: string;
        targetLocation: string;
    }>;
}

const AccountInformation = (props: IAccountInformationProps) => {
    return (
        <>
            <h1 className="text-[24px] text-colors-dark dark:text-white">
                {props.title}
            </h1>
            <p className="text-[16px] text-gray-500">{props.description}</p>
            <div className="my-4 grid grid-cols-4 max-800px:grid-cols-2 gap-4">
                {props.items.map((item, index) => (
                    <Link
                        href={item.targetLocation}
                        key={index}
                        className="w-full flex flex-col gap-2 my-2 p-4 border dark:border-transparent rounded-md shadow-md bg-colors-mainBackground"
                    >
                        <div className="text-[32px] text-colors-dark dark:text-white">
                            {item.icon}
                        </div>
                        <div>
                            <h2 className="text-[18px] font-semibold">
                                {item.innerTitle}
                            </h2>
                            <p className="text-gray-500">
                                {item.innerDescription}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default AccountInformation;
