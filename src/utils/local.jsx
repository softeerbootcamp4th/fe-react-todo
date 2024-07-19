export function getRecentTodo() {
  let JSONData = localStorage.getItem("recent-todo");
  return JSONData ? JSON.parse(JSONData) : [];
}

export function pushRecentTodo(todo) {
  let recentTodoList = getRecentTodo();
  recentTodoList = [todo, ...recentTodoList];
  while (recentTodoList.length > 5) {
    recentTodoList.pop();
  }
  localStorage.setItem("recent-todo", JSON.stringify(recentTodoList));
}
