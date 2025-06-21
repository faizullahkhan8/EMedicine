/* eslint-disable @typescript-eslint/no-explicit-any */
import image1 from "@/public/images/Acifyl_pic.webp";
import Image2 from "@/public/images/Burofen_pic.jpeg";
import Image3 from "@/public/images/Flygel_pic.webp";
import image4 from "@/public/images/SurbexZ_pic.jpeg";
import image5 from "@/public/images/flagyl_tablets_pic.webp";

import { ISliderImageOptions } from "../components/HomePage/ImageSlider";

import pharmacyImage from "@/public/images/pahramacy_pic.jpg";
import labImage from "@/public/images/lab_pic.jpg";

// import bannerPharamacyClip from "@/public/videos/banner_pharmacy_clip.mp4";
// import bannerLabClip from banner_pharmacy_clip.mp4;

export const MedicineArrayForShowCase: any = [
    {
        imageUrl: Image3.src,
        title: "Burufen (120mg)",
        subTitle: "Ibuprofen",
        price: 130.0,
        estimatedPrice: 150.0,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: image4.src,
        title: "Acifyle (120mg)",
        subTitle: "Then what to do",
        price: 130.0,
        estimatedPrice: 150.0,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: image5.src,
        title: "exmple 1 (120mg)",
        subTitle: "Then what to do",
        price: 130.0,
        estimatedPrice: 150.0,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: image1.src,
        title: "exmple (120mg)",
        subTitle: "Then what to do",
        price: 130.0,
        estimatedPrice: 150.0,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: Image2.src,
        title: "exmple (120mg)",
        subTitle: "Then what to do",
        price: 130.0,
        estimatedPrice: 150.0,
        mainItemLocation: "example/url",
    },
];

export const ImagesForCarosoul = [
    "/videos/banner_pharmacy_clip.mp4",
    "/videos/banner_lab_clip.mp4",
    "/videos/banner_pharmacy_clip_1.mp4",
];

export const ImagesForSlider: Array<ISliderImageOptions> = [
    {
        imageUrl: Image2.src,
        medicineName: "Burufen (120mg)",
        percentageOff: 15,
        price: 200,
        estimatedPrice: 230,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: image1.src,
        medicineName: "Acifyle (120mg)",
        percentageOff: 10,
        price: 100,
        estimatedPrice: 120,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: Image3.src,
        medicineName: "Flygel (120mg)",
        percentageOff: 10,
        price: 100,
        estimatedPrice: 120,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: image4.src,
        medicineName: "SurbexZ (120mg)",
        percentageOff: 15,
        price: 200,
        estimatedPrice: 230,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: image5.src,
        medicineName: "Flygel Tablates",
        percentageOff: 15,
        price: 200,
        estimatedPrice: 230,
        mainItemLocation: "example/url",
    },
];

export const TwoSectionsData = [
    {
        imageUrl: pharmacyImage.src,
        title: "Order Medicines",
        description:
            "Get them delivered to your doorstep with Upto 10% OFF on all your pharmacy orders!",
    },
    {
        imageUrl: labImage.src,
        title: "Lab Tests",
        description:
            "Home-sample & in-lab booking at upto 28% OFF on lab tests form top labs in Pakistan!",
    },
];
