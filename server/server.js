const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let todoItems = [];
let recentSearchItems = [];
let logs = {};
let todoIdCounter = 1;
let logIdCounter = 1;

// 로그 생성 함수
function createLog(content, type, oldContent = '') {
    const newLog = {
        id: logIdCounter,
        content,
        type,
        oldContent
    };
    logs[logIdCounter] = newLog;
    logIdCounter++;
}

// Read all recent search items
app.get('/recent-search', (req, res) => {
    res.json(recentSearchItems.slice().reverse());
});


// Create a new todo item
app.post('/todo', (req, res) => {
    const { content, isEnd } = req.body;
    const newTodo = {
        id: todoIdCounter,
        content,
        isEnd
    };
    todoItems.push(newTodo);
    recentSearchItems.push(content);

    if (recentSearchItems.length > 5){
        recentSearchItems.shift()
    }

    createLog(`${content}`, 'ADD');
    todoIdCounter++;
    res.status(201).json(newTodo);
});

// Read all todo items
app.get('/todo', (req, res) => {
    res.json(todoItems.slice().reverse());
});

// Read a single todo item by id
app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = todoItems.find(item => item.id === parseInt(id));
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo item not found' });
    }
});

// Update a todo item by id
app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { content, isEnd } = req.body;
    const todo = todoItems.find(item => item.id === parseInt(id));
    if (todo) {
        const oldContent = todo.content;
        todo.content = content;
        todo.isEnd = isEnd;
        createLog(`${content}`, 'EDIT', `${oldContent}`);
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo item not found' });
    }
});

// Update a todo item by id
app.put('/todo/done/:id', (req, res) => {
    const { id } = req.params;
    const { isEnd } = req.body;
    const todo = todoItems.find(item => item.id === parseInt(id));
    if (todo) {
        todo.isEnd = isEnd;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo item not found' });
    }
});

// Delete a todo item by id
app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todoItems.findIndex(item => item.id === parseInt(id));
    
    if (todoIndex !== -1) {
        const deletedTodo = todoItems.splice(todoIndex, 1)[0];
        createLog(`${deletedTodo.content}`, 'DELETE', `Deleted content: ${deletedTodo.content}`);
        res.json(deletedTodo);
    } else {
        res.status(404).json({ message: 'Todo item not found' });
    }
});

// Replace all todo items in reverse order
app.put('/todo', (req, res) => {
    const { newTodoItems } = req.body;
    if (!Array.isArray(newTodoItems)) {
        return res.status(400).json({ message: 'Invalid data format' });
    }
    
    const reversedTodoItems = newTodoItems.reverse();
    todoItems = reversedTodoItems
    todoIdCounter = todoItems.length + 1;
    res.status(200).json(todoItems);
});


// Create a new log entry
app.post('/log', (req, res) => {
    const { content, type, oldContent } = req.body;
    const newLog = {
        id: logIdCounter,
        content,
        type,
        oldContent
    };
    logs[logIdCounter] = newLog;
    logIdCounter++;
    res.status(201).json(newLog);
});

// Read all log entries
app.get('/log', (req, res) => {
    res.json(Object.values(logs).reverse());
});

// Read a single log entry by id
app.get('/log/:id', (req, res) => {
    const { id } = req.params;
    const log = logs[id];
    if (log) {
        res.json(log);
    } else {
        res.status(404).json({ message: 'Log entry not found' });
    }
});

// Update a log entry by id
app.put('/log/:id', (req, res) => {
    const { id } = req.params;
    const { content, type, oldContent } = req.body;
    const log = logs[id];
    if (log) {
        log.content = content;
        log.type = type;
        log.oldContent = oldContent;
        res.json(log);
    } else {
        res.status(404).json({ message: 'Log entry not found' });
    }
});

// Delete all log entries
app.delete('/log', (req, res) => {
    logs = {};
    res.status(200).json({ message: 'All log entries have been deleted' });
});

// Delete a log entry by id
app.delete('/log/:id', (req, res) => {
    const { id } = req.params;
    const log = logs[id];
    if (log) {
        delete logs[id];
        res.json(log);
    } else {
        res.status(404).json({ message: 'Log entry not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
