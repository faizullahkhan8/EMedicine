"use client";
import ShowMedicines from "@/app/components/AllMedicines/ShowMedicines";
import AllCategories from "@/app/utils/AllCategories";
import Heading from "@/app/utils/Heading";
import ShowLocationHerarchy from "@/app/utils/ShowLocationHerarchy";

const page = () => {
    return (
        <div className="default-page-padding flex gap-4 flex-col">
            <Heading
                title={`Medication | Category`}
                description="View all medicines of the particular category"
                keyword="all medicines, category, pharmacy, healthcare, eMedicine"
            />
            <ShowLocationHerarchy />
            <AllCategories />
            <ShowMedicines />
        </div>
    );
};

export default page;
