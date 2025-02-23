import React from "react";
import ExtendableList from "./ExtendableList";

const MobileSideBarList = () => {
    return (
        <div className="flex flex-col gap-2 w-full transition-all duration-500">
            <ExtendableList
                header="Wellness and Quality"
                listItems={["Beauty Pear", "lorem ipsum", "Emmet Abbreviation"]}
            />
            <ExtendableList
                header="Wellness and Quality"
                listItems={["Beauty Pear", "lorem ipsum", "Emmet Abbreviation"]}
            />
            <ExtendableList
                header="Wellness and Quality"
                listItems={["Beauty Pear", "lorem ipsum", "Emmet Abbreviation"]}
            />
            <ExtendableList
                header="Wellness and Quality"
                listItems={["Beauty Pear", "lorem ipsum", "Emmet Abbreviation"]}
            />
            <ExtendableList
                header="Wellness and Quality"
                listItems={["Beauty Pear", "lorem ipsum", "Emmet Abbreviation"]}
            />
            <ExtendableList
                header="Wellness and Quality"
                listItems={["Beauty Pear", "lorem ipsum", "Emmet Abbreviation"]}
            />
        </div>
    );
};

export default MobileSideBarList;
