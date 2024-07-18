import { DragEvent } from "react";

export interface BaseTodoId {
    id: string;
}

export interface BaseTodoItem {
    description: string;
    isChecked: boolean;
}

export interface TodoItemType extends BaseTodoItem, BaseTodoId {}

export interface TodoItemProps {
    todo: TodoItemType;
    handleDragStart: (id: string) => void;
    handleDragOver: (e: DragEvent<HTMLLIElement>) => void;
    handleDrop: (e: DragEvent<HTMLLIElement>, id: string) => void;
}
