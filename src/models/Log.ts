export interface Log {
  id: number;
  createdAt: string;
  type: "CREATE" | "UPDATE" | "DELETE";
  message: string;
}
