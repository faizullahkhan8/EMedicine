import React from "react";

import { ImagesForSlider } from "@/app/utils/RandomData";
import MedicineCard from "@/app/utils/MedicineCard";

const ShowMedicines = () => {
    return (
        <div className="w-full h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2">
            {ImagesForSlider.map((medicine, index) => (
                <MedicineCard
                    estimatedPrice={medicine.estimatedPrice}
                    imageUrl={medicine.imageUrl}
                    itemLocation={medicine.mainItemLocation}
                    name={medicine.medicineName}
                    price={medicine.price}
                    key={index}
                />
            ))}
        </div>
    );
};

export default ShowMedicines;
