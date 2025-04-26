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
                className={`border rounded border-colors-dark p-1 dark:text-white text-colors-dark bg-transparent outline-none ${className}`}
            />
        </>
    );
};

export default CutomInput;
