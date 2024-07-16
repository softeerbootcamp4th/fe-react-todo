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

export async function popData(id) {
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