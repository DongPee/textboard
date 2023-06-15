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
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('views'));

app.get('/', (req, res) => {
    maria.query('SELECT `작성자`, `제목`, `고유번호`, `작성일자` FROM `게시글`;', (error, rows, field) => {
        if (error) throw error;
        res.render('index', {posts: rows})
    });
});

app.get('/write', (req, res) => {
    res.render('write')
});

app.get('/post', (req, res) => {
    let 글번호 = req.query.글번호;
    var query = 'SELECT `작성자`, `제목`, `고유번호`, `작성일자`, `내용` FROM `게시글` WHERE 고유번호=' + 글번호 + ';';
    maria.query(query, (error, postRows) => {
        if (error) throw error;
        var commentQuery = 'SELECT `작성자`, `시간`, `고유번호`, `내용` FROM `댓글` WHERE `게시글 고유번호`=' + 글번호 + ';';
        maria.query(commentQuery, (error, commentRows) => {
            if (error) throw error;
            res.render('post', { post: postRows, comments: commentRows });
        });
    });
});


app.post('/writing', (req, res) => {
    let 작성자 = req.body.작성자;
    let 제목 = req.body.제목;
    let 비밀번호 = req.body.비밀번호;
    let 내용 = req.body.내용;
    let query = `INSERT INTO \`게시글\` (\`작성자\`,\`제목\`,\`내용\`,\`비밀번호\`) VALUES ("${작성자}", "${제목}", "${내용}", "${비밀번호}");`
    maria.query(query, (error) =>{
        if(error) throw error;
        console.log("게시글 작성 성공");
        return res.redirect('/');
    })
});

app.post('/commenting', (req, res) => {
    let 작성자 = req.body.작성자;
    let 비밀번호 = req.body.비밀번호;
    let 내용 = req.body.내용;
    let 게시글고유번호 = req.body.게시글고유번호;
    let query = `INSERT INTO \`댓글\` (\`작성자\`,\`내용\`,\`비밀번호\`,\`게시글 고유번호\`) VALUES ("${작성자}", "${내용}", "${비밀번호}", "${게시글고유번호}");`
    maria.query(query, (error) =>{
        if(error) throw error;
        console.log("게시글 작성 성공");
        return res.redirect(`/post?글번호=${게시글고유번호}`);
    })
});


app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
});
