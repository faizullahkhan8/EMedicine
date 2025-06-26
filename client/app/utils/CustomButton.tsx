import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ICustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "transparant" | "background";
    children: ReactNode;
}

const Button: FC<ICustomButtonProps> = ({
    className = "",
    children,
    variant,
    ...props
}) => {
    const base =
        "text-center p-1 rounded-md text-black dark:text-white font-semibold hover:shadow-md shadow-black transition-shadow duration-300 border dark:border-transparent";

    const Variants = {
        transparant: "",
        background: "bg-colors-mainBackground",
    };
    return (
        <>
            <button
                className={`${base} text-[14px] ${Variants[variant]} ${className}`}
                {...props}
            >
                {children}
            </button>
        </>
    );
};

export default Button;
