import React from "react";
import ExtendableList from "./ExtendableList";
import { links } from "@/app/utils/RandomData";

const MobileSideBarList = () => {
    return (
        <div className="flex flex-col gap-2 w-full transition-all duration-500">
            {links.map((link, index) => (
                <ExtendableList
                    key={index}
                    header={link.header}
                    listItems={link.listItems}
                />
            ))}
        </div>
    );
};

export default MobileSideBarList;
