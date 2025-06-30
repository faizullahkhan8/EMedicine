import { usePathname } from "next/navigation";

interface ShowLocationHerarchyProps {
    title?: string;
}

const ShowLocationHerarchy = ({ title }: ShowLocationHerarchyProps) => {
    const pathName = usePathname()
        .split("/")
        .filter((item) => item !== "");

    pathName[pathName.length - 1] = decodeURIComponent(
        pathName[pathName.length - 1]
    );
    return (
        <div>
            {title && (
                <h1 className="text-[24px] max-800px:text-[18px] max-400px:text-[14px] font-bold text-gray-800 dark:text-white">
                    {title}
                </h1>
            )}
            {pathName.map((item, index) => {
                return (
                    <span key={index} className="text-gray-500 dark:text-white">
                        {/* [TODO]: Make it link */}
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                        {index < pathName.length - 1 && " > "}
                    </span>
                );
            })}
        </div>
    );
};

export default ShowLocationHerarchy;
