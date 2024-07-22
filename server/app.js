const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const todoFilePath = path.join('./', 'todo.json');
const counterFilePath = path.join('./', 'counter.json')
const logFilePath = path.join('./', 'log.json');

// Middleware 설정
app.use(bodyParser.json());

// cors 설정
app.use(cors({ origin: '*' }));

// todo.json 파일에서 데이터 로드 함수
const loadTodoData = () => {
    if (fs.existsSync(todoFilePath)) {
        const data = fs.readFileSync(todoFilePath);
        return JSON.parse(data);
    } else {
        return { data: [] };
    }
};

const loadLogData = () => {
    if (fs.existsSync(logFilePath)) {
        const data = fs.readFileSync(logFilePath);
        return JSON.parse(data);
    } else {
        return { data: [] };
    }
};

const saveLogData = (data) => {
    fs.writeFileSync(logFilePath, JSON.stringify(data, null, 2));
    // fs.writeFileSync(todoFilePath, JSON.stringify(data, null, 2));
};

const addLog = (content) => {
    const nowDate = new Date();
    const nowDay = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][nowDate.getDay()]
    const dateText = `${nowDate.getFullYear()}.${nowDate.getMonth()+1}.${nowDate.getDate()}.${nowDay} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`
    const logData = loadLogData();
    logData.data.push({ "date": dateText , "content": content });
    saveLogData(logData);
};

// todo.json 파일에 데이터 저장 함수
const saveTodoData = (data) => {
    fs.writeFileSync(todoFilePath, JSON.stringify(data, null, 2));
};

const loadLastId = () => {
    if (fs.existsSync(counterFilePath)) {
        const data = fs.readFileSync(counterFilePath);
        return JSON.parse(data).lastId;
    } else {
        return 0;
    }
};

const saveLastId = (lastId) => {
    fs.writeFileSync(counterFilePath, JSON.stringify({ lastId }));
};

const generateUniqueId = () => {
    const lastId = loadLastId();
    const newId = lastId + 1;
    saveLastId(newId);
    return newId;
};

// GET /todo 요청 처리
app.get('/todo', (req, res) => {
    const todoData = loadTodoData();
    res.json(todoData);
});

app.get('/todo/log', (req, res) => {
    const todoData = loadLogData();
    res.json(todoData);
});

// POST /todo/change 요청 처리: id1과 id2의 순서를 변경
app.post('/todo/change', (req, res) => {
    const { id1, id2 } = req.body;
    const todoData = loadTodoData();
    const index1 = todoData.data.findIndex(item => item.id === id1);
    const index2 = todoData.data.findIndex(item => item.id === id2);

    if (index1 === -1 || index2 === -1) {
        return res.status(404).send('Todo item not found');
    }

    // 순서 변경
    [todoData.data[index1], todoData.data[index2]] = [todoData.data[index2], todoData.data[index1]];

    saveTodoData(todoData);

    const content = `[${todoData.data[index1].title}]와 [${todoData.data[index2].title}]의 순서가 바뀌었습니다`;
    addLog(content);
    
    res.json(todoData);
});

// POST /todo 요청 처리: 해당 title 추가
app.post('/todo', (req, res) => {
    const { title } = req.body;
    const todoData = loadTodoData();
    const newTodo = { "title": title, "id": generateUniqueId() };
    
    // 기존 데이터에 새 객체 추가
    todoData.data.push(newTodo);
    const content = `[${title}] 내용이 추가되었습니다.`;
    addLog(content);
    
    saveTodoData(todoData);
    res.json(todoData);
});

// DELETE /todo/:id 요청 처리: 해당 id의 데이터를 삭제
app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todoData = loadTodoData();
    const content = todoData.data.filter(item => item.id === parseInt(id))[0]
    const newTodoData = {
        data: todoData.data.filter(item => item.id !== parseInt(id))
    };

    addLog(`[${content.title}]이 지워졌습니다.`);
    
    saveTodoData(newTodoData);
    res.json(newTodoData);
});

// PUT /todo/:id 요청 처리: 해당 id의 title을 변경
app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const todoData = loadTodoData();
    const todoItem = todoData.data.find(item => item.id === parseInt(id));
    
    if (!todoItem) {
        return res.status(404).send('Todo item not found');
    }
    
    addLog(`[${todoItem.title}]이 [${title}]로 바뀌었습니다.`);
    // title 변경
    todoItem.title = title;

    saveTodoData(todoData);
    res.json(todoData);
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
