import React from "react";
import DropDownList from "./DropDownList";

const NavigationLinks = () => {
    return (
        <>
            <DropDownList
                header="Wellness and Beauty"
                listItems={["Hello", "this", "is", "me"]}
            />
            <DropDownList
                header="Devices and Injections"
                listItems={["Hello", "this", "is", "me"]}
            />
            <DropDownList
                header="Labortries"
                listItems={["Hello", "this", "is", "me"]}
            />
            <DropDownList
                header="Labortries"
                listItems={["Hello", "this", "is", "me"]}
            />
            <DropDownList
                header="Top Brands"
                listItems={["Hello", "this", "is", "me"]}
            />
        </>
    );
};

export default NavigationLinks;
