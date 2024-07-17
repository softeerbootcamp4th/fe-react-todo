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
}
