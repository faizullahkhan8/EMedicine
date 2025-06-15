/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Heading from "./utils/Heading";
import MedicineShowCaseGird from "./utils/MedicineShowCaseGird";

const Page = () => {
    const MedicineArrayForShowCase: any = [
        {
            imageUrl: "dummy",
            title: "Burufen (120mg)",
            subTitle: "Ibuprofen",
            price: 130.0,
            estimatedPrice: 150.0,
            mainItemLocation: "example/url",
        },
        {
            imageUrl: "dummy",
            title: "Acifyle (120mg)",
            subTitle: "Then what to do",
            price: 130.0,
            estimatedPrice: 150.0,
            mainItemLocation: "example/url",
        },
        {
            imageUrl: "dummy",
            title: "exmple 1 (120mg)",
            subTitle: "Then what to do",
            price: 130.0,
            estimatedPrice: 150.0,
            mainItemLocation: "example/url",
        },
        {
            imageUrl: "dummy",
            title: "exmple (120mg)",
            subTitle: "Then what to do",
            price: 130.0,
            estimatedPrice: 150.0,
            mainItemLocation: "example/url",
        },
        {
            imageUrl: "dummy",
            title: "exmple (120mg)",
            subTitle: "Then what to do",
            price: 130.0,
            estimatedPrice: 150.0,
            mainItemLocation: "example/url",
        },
    ];

    return (
        <div>
            <div className="w-full flex justify-center flex-col my-4 px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem]">
                <Heading
                    title="EMedicine"
                    description="EMedicine is online pharmacy provide medicine all over the pakistan with the best price."
                    keyword="Medicine,Pharmacy,Online Pharmacy"
                />
                <MedicineShowCaseGird
                    MiniTitle="pharmacy"
                    Title="Wide Range Of Medicines"
                    Items={MedicineArrayForShowCase}
                />
            </div>
        </div>
    );
};

export default Page;
