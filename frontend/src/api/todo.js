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

export function getLogList() {
  return fetch("http://localhost:3000/log").then((res) => res.json());
}

export function postLogList(logList) {
  return fetch("http://localhost:3000/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logList),
  }).then((res) => res.json());
}

export function deleteLogList() {
  return fetch("http://localhost:3000/log", { method: "DELETE" }).then((res) =>
    res.json()
  );
}
