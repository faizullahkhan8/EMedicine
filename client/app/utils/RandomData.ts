/* eslint-disable @typescript-eslint/no-explicit-any */
import Acifyl from "@/public/images/Acifyl_pic.png";
import Burofen from "@/public/images/Burofen_pic.png";
import Flygel from "@/public/images/Flygel_pic.png";
import SurbexZ from "@/public/images/SurbexZ_pic.png";
import FlygelTablets from "@/public/images/flagyl_tablets_pic.png";

import { ISliderImageOptions } from "../components/HomePage/ImageSlider";

import pharmacyImage from "@/public/images/pahramacy_pic.jpg";
import labImage from "@/public/images/lab_pic.jpg";

// import bannerPharamacyClip from "@/public/videos/banner_pharmacy_clip.mp4";
// import bannerLabClip from banner_pharmacy_clip.mp4;

export const MedicineArrayForShowCase: any = [
    {
        imageUrl: Burofen.src,
        title: "Burufen (120mg)",
        subTitle: "Ibuprofen",
        price: 130.0,
        estimatedPrice: 150.0,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: Acifyl.src,
        title: "Acifyle (120mg)",
        subTitle: "Then what to do",
        price: 130.0,
        estimatedPrice: 150.0,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: FlygelTablets.src,
        title: "Flygel Tab (120mg)",
        subTitle: "Then what to do",
        price: 130.0,
        estimatedPrice: 150.0,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: SurbexZ.src,
        title: "Surbex Z (120mg)",
        subTitle: "Then what to do",
        price: 130.0,
        estimatedPrice: 150.0,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: Flygel.src,
        title: "Flygel (120mg)",
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
        imageUrl: Burofen.src,
        medicineName: "Burufen (120mg)",
        percentageOff: 15,
        price: 200,
        estimatedPrice: 230,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: Acifyl.src,
        medicineName: "Acifyle (120mg)",
        percentageOff: 10,
        price: 100,
        estimatedPrice: 120,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: Flygel.src,
        medicineName: "Flygel (120mg)",
        percentageOff: 10,
        price: 100,
        estimatedPrice: 120,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: SurbexZ.src,
        medicineName: "SurbexZ (120mg)",
        percentageOff: 15,
        price: 200,
        estimatedPrice: 230,
        mainItemLocation: "example/url",
    },
    {
        imageUrl: FlygelTablets.src,
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

export const links = [
    {
        header: "Wellness & Beauty",
        listItems: [
            "Skin Care",
            "Hair Care",
            "Personal Hygiene",
            "Beauty Supplements",
        ],
    },
    {
        header: "Devices & Injections",
        listItems: [
            "Blood Pressure Monitors",
            "Thermometers",
            "Insulin Pens",
            "Syringes",
        ],
    },
    {
        header: "Laboratories",
        listItems: [
            "Malaria Tests",
            "Blood Sugar Tests",
            "Cholesterol Tests",
            "COVID-19 Tests",
        ],
    },
    {
        header: "Supplements",
        listItems: [
            "Vitamins",
            "Minerals",
            "Protein Powders",
            "Herbal Supplements",
        ],
    },
];

export const howWeWorkData = [
    {
        title: "Pharmacy",
        steps: [
            "Search and select your medicine",
            "Enter your details to confirm order",
            "Sit back and your medicine will be delivered at your doorstep",
        ],
    },
    {
        title: "Lab Tests",
        steps: [
            "Choose your desired lab test",
            "Book an appointment or request home sample collection",
            "Receive your test results online",
        ],
    },
    {
        title: "Doctor Appointment",
        steps: [
            "Select a doctor from our network",
            "Book an appointment online",
            "Consult with the doctor via video call or in-person",
        ],
    },
];
