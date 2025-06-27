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
        imageUrl: "wellness-beauty.png",
        listItems: [
            "Skin Care",
            "Hair Care",
            "Personal Hygiene",
            "Beauty Supplements",
        ],
    },
    {
        header: "Devices & Injections",
        imageUrl: "devices-injections.png",
        listItems: [
            "Blood Pressure Monitors",
            "Thermometers",
            "Insulin Pens",
            "Syringes",
        ],
    },
    {
        header: "Laboratories",
        imageUrl: "tests-labortries.png",
        listItems: [
            "Malaria Tests",
            "Blood Sugar Tests",
            "Cholesterol Tests",
            "COVID-19 Tests",
        ],
    },
    {
        header: "Supplements",
        imageUrl: "supliments.png",
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

export const DoctorsWithLocationData = [
    "Dermatologist",
    "Gynecologist ",
    "Cardiologist ",
    "Dentist ",
    "Urologist ",
    "Sexologist ",
    "Child Specialist ",
    "Orthopedic Surgeon ",
    "Eye Specialist ",
    "ENT Specialist ",
    "Neurologist ",
    "Nephrologist ",
    "Pulmonologist ",
    "Gastroenterologist ",
    "Psychiatrist ",
];

export const MedicineInformationData = {
    title: "Metronidazole",
    description:
        "This medicine is used to treat bacterial and protozoal infections. It contains Metronidazole, an antibiotic that works by attacking the bacteria, killing them, and preventing the infection from spreading.",
    ingredients: ["Metronidazole"],
    drugClass: "Nitroimidazole Class of Antibiotics",
    dosageForm: "Tablet",
    uses: [
        "Skin infections, rosacea, and mouth infections, including infected gums and dental abscesses.",
        "Conditions such as bacterial vaginosis and pelvic inflammatory disease.",
        "Infected insect bites, skin ulcers, bed sores, and wounds.",
        "Bacterial and parasitic infections.",
    ],
    dosageInstructions: [
        "Use the medicine as per your doctor's recommendation.",
        "The dosage is dependent on the age, condition, and severity.",
    ],
    overdose:
        "Seek medical help immediately if you think you have overdosed on this medication.",
    missedDose:
        "If you miss a dose, take it as soon as possible the same day. If you don't remember missing the dose, don't double it. Consult your doctor on how to adjust the missing doses.",
    howToUse: [
        "If you are using the cream or gel, wash your hands before using it. Carefully apply the cream/gel on the affected skin area. Don't use too much, apply a thin layer.",
        "If you are using the intravenous injection, get a medical practitioner to inject it in the vein.",
        "Try to get the medication dose daily and at the same time to get the most benefit.",
        "You can take the capsule/tablet form with or without food.",
    ],
    whenNotToUse:
        "This medicine is contraindicated in patients with blood disorders and pregnant and lactating females.",
    sideEffects: [
        "Local irritation",
        "Pruritus (localized or generalized itching)",
        "Metallic taste",
        "Nausea",
        "Numbness of the extremities",
    ],
    precautionsAndWarnings: [
        "Take with caution if there has been a history of drug-related allergy.",
        "Don't operate heavy machinery or do anything that requires alertness.",
    ],
    drugInteractions:
        "Ask your doctor about any possible drug interactions, and discuss every medicine you have been taking.",
    storageDisposal:
        "Store the medicine at room temperature and keep out of direct sunlight, excessive heat, and moisture. Keep the medicine out of the reach of children and animals. Do not use the medication past its expiration date.",
    controlDrug: "No",
    quickTips: ["Always follow your doctor's advice and never self-medicate."],
};
