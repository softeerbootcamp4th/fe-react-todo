export async function getData() {
  const data = await fetch("http://localhost:3000/todo");
  const dataList = await data.json();
  return dataList;
}

export async function pushData(newData) {
  const promise = await fetch("http://localhost:3000/todo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData)
  });
  const data = await promise.json();
  return data.id;
}

export function popData(id) {
  fetch(`http://localhost:3000/todo/${id}`, {
    method: "DELETE",
  })
}

export function modifyData(id, field) {
  fetch(`http://localhost:3000/todo/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(field),
  })
}

export async function replaceAllData(data) {
  const oldData = await getData();
  oldData.forEach((todo) => popData(todo.id));
  data.forEach(async (todo) => await pushData(todo));
}

export async function getHistory() {
  const data = await fetch("http://localhost:3000/history?_sort=-date");
  const dataList = await data.json();
  return dataList;
}

export function pushHistory(newHistory) {
  fetch("http://localhost:3000/history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newHistory)
  })
}

export async function clearAllHistory() {
  const oldData = await getHistory();
  oldData.forEach((history) => {
    fetch(`http://localhost:3000/history/${history.id}`, {
      method: "DELETE"
    })
  })
}