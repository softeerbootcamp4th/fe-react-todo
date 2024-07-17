import React from "react"
import Button from "./Button.tsx";

interface TextFieldProps {
    toDo: string;
    setToDo: (todo: React.ChangeEvent<HTMLInputElement>) => void;
    addToDo: (todo: string) => undefined;
}


const TextField = ({ toDo, setToDo, addToDo }: TextFieldProps) => {
    return (
        <div className="flex w-1/3 gap-4 mt-40">
            <input
                type="text"
                value={toDo}
                onChange={setToDo}
                placeholder="할일을 입력하세요"
                style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', flexGrow: 1 }}
            />
            <Button width={90} height={50} backgroundColor="0f8f41" title={"등록"} cb={addToDo} value={toDo} />
        </div>
    )
}

export default TextField
