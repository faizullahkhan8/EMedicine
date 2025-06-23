import React, { FC } from "react";

type Props = {
    type: string;
    placeholder: string;
    className?: string;
};

const CutomInput: FC<Props> = ({ type, placeholder, className }) => {
    return (
        <>
            <input
                placeholder={placeholder}
                type={type}
                className={`border dark:border-transparent rounded-md shadow-md p-1 dark:text-white text-colors-dark outline-none bg-colors-mainBackground ${className}`}
            />
        </>
    );
};

export default CutomInput;
