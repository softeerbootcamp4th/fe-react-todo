export function getTodoList() {
  return fetch("http://localhost:3000/todo").then((res) => res.json());
}

export function postToDoList(todoList) {
  return fetch("http://localhost:3000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoList),
  }).then((res) => res.json());
}
