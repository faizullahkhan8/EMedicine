"use client";

import React, { FC } from "react";
import Heading from "./utils/Heading";

type Props = {};

const Page: FC<Props> = (props) => {
    return (
        <div>
            <Heading
                title="EMedicine"
                description="EMedicine is online pharmacy provide medicine all over the pakistan with the best price."
                keyword="Medicine,Pharmacy,Online Pharmacy"
            />
        </div>
    );
};

export default Page;
