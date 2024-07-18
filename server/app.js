
const express = require('express');

const app = express();

app.listen(3000, function() {

})

app.get('/todo', function(req, res) {
    
})

// 내용 삭제
app.delete('/todo/:id', function(req, res) {

})

// 내용 수정
app.patch('/todo/:id', function(req, res) {

})

// 내용 변경
app.post('/todo', function(res, req) {

})