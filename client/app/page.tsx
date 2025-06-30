/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Heading from "./utils/Heading";
import Carosoul from "./components/HomePage/Carosuol";
import ImageSlider from "./components/HomePage/ImageSlider";
import TwoSections from "./components/HomePage/TwoSections";
import MissionStatement from "./components/HomePage/MissionStatement";
import HowWeWork from "./components/HomePage/HowWeWork";
import {
    ImagesForCarosoul,
    ImagesForSlider,
    MedicineArrayForShowCase,
    TwoSectionsData,
} from "./utils/RandomData";
import MedicineShowCaseGird from "./components/HomePage/MedicineShowCaseGird";
import DoctorsWithLocation from "./components/HomePage/DoctorsWithLocation";

const Page = () => {
    return (
        <div>
            <div className="w-full flex justify-center flex-col default-page-padding">
                <Heading
                    title="EMedicine | Online Pharmacy in Pakistan"
                    description="EMedicine is online pharmacy provide medicine all over the pakistan with the best price."
                    keyword="Medicine,Pharmacy,Online Pharmacy"
                />
                <Carosoul videos={ImagesForCarosoul} />
                <TwoSections
                    TopTitle="How Can We Helps?"
                    items={TwoSectionsData}
                />
                <MissionStatement />
                <MedicineShowCaseGird
                    Title="Wide Range of Medicines"
                    Items={MedicineArrayForShowCase}
                    MiniTitle="PHARMACY"
                />
                <HowWeWork />
                <ImageSlider
                    title="Top Selling products"
                    subTitle="Get your necessities at upto 10% discount on all items."
                    Images={ImagesForSlider}
                />
                <DoctorsWithLocation />
            </div>
        </div>
    );
};

export default Page;
