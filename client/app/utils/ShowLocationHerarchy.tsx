import { usePathname } from "next/navigation";

const ShowLocationHerarchy = () => {
    const pathName = usePathname()
        .split("/")
        .filter((item) => item !== "");

    pathName[pathName.length - 1] = decodeURIComponent(
        pathName[pathName.length - 1]
    );
    return (
        <div>
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
