import React from "react";

interface ButtonProps {
    width: number;
    height: number;
    backgroundColor: string;
    title: string;
    value: string;
    cb: (param: string) => undefined;
}

const Button: React.FC<ButtonProps> = ({
    width,
    height,
    backgroundColor,
    title,
    value,
    cb
}: ButtonProps) => {
    console.log(value)
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
    const temp = () => {
        console.log(value)
        cb(value)
    }

    return (
        <div className="rounded-lg flex justify-center place-items-center" style={buttonStyle} onClick={temp}>
            <p style={titleStyle}>{title}</p>
        </div>
    )
}

export default Button
