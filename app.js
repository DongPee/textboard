const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const mysql = require('mysql');
const maria = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: '게시판'
});
maria.connect();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('views'));

app.get('/', (req, res) => {
    maria.query('SELECT `작성자`, `제목`, `고유번호`, `작성일자` FROM `게시글`;', (error, rows, field) => {
        if (error) throw error;
        res.render('index', {posts: rows})
    });
});

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
});
