import React, { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const CutomInput: FC<Props> = ({ className, ...props }) => {
    return (
        <>
            <input
                {...props}
                className={`border dark:border-transparent rounded-md shadow-md p-1 dark:text-white text-colors-dark outline-none bg-colors-mainBackground ${className}`}
            />
        </>
    );
};

export default CutomInput;
