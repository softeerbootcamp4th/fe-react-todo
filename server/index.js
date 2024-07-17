const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
var fs = require("fs");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/todo", (req, res) => {
  const newData = req.body;
  const jsonFilePath = "./data/todoList.json";

  fs.writeFile(
    jsonFilePath,
    JSON.stringify(newData, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
      res.sendFile(__dirname + "/data/todoList.json");
    }
  );
});

app.get("/todo", (req, res) => {
  res.sendFile(__dirname + "/data/todoList.json");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
