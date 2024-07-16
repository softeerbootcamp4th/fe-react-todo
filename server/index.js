const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todo", (req, res) => {
  res.sendFile(__dirname + "/data/todoList.json");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
