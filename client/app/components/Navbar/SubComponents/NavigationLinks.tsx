import React, { useState, useEffect, useRef } from "react";
import DropDownList from "./DropDownList";
import { FiArrowRight } from "react-icons/fi";
import { links } from "@/app/utils/RandomData";

const NavigationLinks = () => {
    const [visibleLinks, setVisibleLinks] = useState(links);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateVisibleLinks = () => {
            if (!navRef.current) return;

            const screenWidth = window.innerWidth;
            if (screenWidth <= 800) {
                setVisibleLinks([]); // Hide everything below 800px
                return;
            }

            let maxLinks = links.length;
            if (screenWidth <= 1100)
                maxLinks = Math.floor((screenWidth - 800) / 100); // Gradual hiding

            setVisibleLinks(links.slice(0, maxLinks));
        };

        updateVisibleLinks();
        window.addEventListener("resize", updateVisibleLinks);
        return () => window.removeEventListener("resize", updateVisibleLinks);
    }, []);

    return (
        <div ref={navRef} className="w-full flex items-center space-x-4">
            {visibleLinks.map((link) => (
                <DropDownList
                    key={link.header}
                    header={
                        <span className="dark:text-white text-colors-dark truncate h-full w-full text-ellipsis">
                            {link.header}
                        </span>
                    }
                    listItems={link.listItems}
                />
            ))}

            {/* "See All Categories" always remains visible unless screen is < 800px */}
            {window.innerWidth > 800 && (
                <div className="dark:text-white text-colors-dark flex items-center justify-center gap-2">
                    All Categories
                    <FiArrowRight className="dark:text-colors-dark font-[18px]" />
                </div>
            )}
        </div>
    );
};

export default NavigationLinks;
