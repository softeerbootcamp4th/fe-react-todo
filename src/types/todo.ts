export interface TodoItemType {
    id: string;
    description: string;
    isChecked: boolean;
}

export interface TodoItemProps {
    todo: TodoItemType;
}
