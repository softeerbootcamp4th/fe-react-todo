import { ChangeEvent, useState } from "react";

function Input() {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {};

    return (
        <>
            <input value={inputValue} onChange={handleInputChange} />
            <button onClick={handleSubmit}></button>
        </>
    );
}

export default Input;
