/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ShowMedicines from "@/app/components/AllMedicines/ShowMedicines";
import Heading from "@/app/utils/Heading";
import ShowLocationHerarchy from "@/app/utils/ShowLocationHerarchy";
import { useSearchParams } from "next/navigation";

const Page = () => {
    const searchQuery = useSearchParams().get("search_q");

    return (
        <div className="default-page-padding flex gap-4 flex-col">
            <Heading
                title={`Search Result | ${searchQuery}`}
                description="View all medicines of the particular category"
                keyword="all medicines, category, pharmacy, healthcare, eMedicine"
            />
            <ShowLocationHerarchy
                title={`Search Result for '${searchQuery}'`}
            />
            <ShowMedicines />
        </div>
    );
};

export default Page;
