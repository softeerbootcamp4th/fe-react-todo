import React from "react";

interface ButtonProps {
    width: number;
    height: number;
    backgroundColor: string;
    title: string;
    cb: () => void;
}

const Button: React.FC<ButtonProps> = ({
    width,
    height,
    backgroundColor,
    title,
    cb
}: ButtonProps) => {

    const buttonStyle: React.CSSProperties = {
        backgroundColor: `#${backgroundColor}ff`,
        width: `${width}px`,
        height: `${height}px`,
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '16px',
        fontWeight: 600,
        color: "white"
    }

    return (
        <div className="rounded-lg flex justify-center place-items-center" style={buttonStyle} onClick={cb}>
            <p style={titleStyle}>{title}</p>
        </div>
    )
}

export default Button
