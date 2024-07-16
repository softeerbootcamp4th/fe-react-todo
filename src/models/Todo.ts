export interface Todo {
  id: number;
  title: string;
  status: "active" | "completed";
  isEditing: boolean;
}
