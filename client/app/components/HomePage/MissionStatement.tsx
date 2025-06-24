import Link from "next/link";
import React from "react";

const MissionStatement = () => {
    return (
        <div className="flex max-800px:flex-col gap-4 justify-between w-[95%] my-10">
            {/* Left */}
            <div className="800px:w-[30%]">
                <p className="text-[12px] font-thin">MISSON STATEMENT</p>
                <h2 className="text-[24px]">
                    Target Pain,
                    <br /> Not Patient
                </h2>
            </div>
            {/* Right */}
            <div className="flex-1 flex flex-col gap-8">
                <p className="text-[16px] max-800px:text-[14px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi voluptatum nobis tempora. Maiores ipsa ullam
                    dolorum eaque atque repudiandae at aliquam, nam suscipit
                    aliquid. Nemo nihil eligendi modi enim ullam!
                </p>
                <Link
                    href={""}
                    className="inline-block w-max relative max-800px:text-[14px] text-[16px] group"
                >
                    Read More
                    <div className="absolute left-0 -bottom-2 w-8 h-1 bg-colors-primary transition-all duration-300 max-800px:group-hover:w-[4.7rem] group-hover:w-[5.4rem]" />
                </Link>
            </div>
        </div>
    );
};

export default MissionStatement;
