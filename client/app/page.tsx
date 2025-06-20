/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Heading from "./utils/Heading";
import Carosoul from "./components/HomePage/Carosuol";
import ImageSlider from "./components/HomePage/ImageSlider";
import TwoSections from "./components/HomePage/TwoSections";
import {
    ImagesForCarosoul,
    ImagesForSlider,
    TwoSectionsData,
} from "./utils/RandomData";

const Page = () => {
    return (
        <div>
            <div className="w-full flex justify-center flex-col my-4 px-[7rem] max-1000px:px-[5rem] max-800px:px-[3rem]">
                <Heading
                    title="EMedicine"
                    description="EMedicine is online pharmacy provide medicine all over the pakistan with the best price."
                    keyword="Medicine,Pharmacy,Online Pharmacy"
                />
                <Carosoul videos={ImagesForCarosoul} />
                <TwoSections
                    TopTitle="How Can We Helps?"
                    items={TwoSectionsData}
                />
                <ImageSlider
                    title="Top Selling products"
                    subTitle="Get your necessities at upto 10% discount on all items."
                    Images={ImagesForSlider}
                />
            </div>
        </div>
    );
};

export default Page;
