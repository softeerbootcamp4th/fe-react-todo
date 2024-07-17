import React, { useState } from "react"
import Button from "./Button.tsx";

const TextField = () => {
    const [toDo, setToDo] = useState("")

    const toDoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToDo(event.target.value)
    }

    return (
        <div className="flex w-1/3 gap-4 mt-40">
            <input
                type="text"
                value={toDo}
                onChange={toDoChangeHandler}
                placeholder="할일을 입력하세요"
                style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', flexGrow: 1 }}
            />
            <Button width={90} height={50} backgroundColor="0f8f41" title={"등록"} cb={() => { }} />
        </div>
    )
}

export default TextField
