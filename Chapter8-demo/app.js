const express = require('express');
const session = require('express-session');
// 解析前端req裡面的body
const bp = require('body-parser');
const path = require('path');

const app = express();

// Middleware

// body-parser
app.use(bp.urlencoded());
app.use(bp.json());

// 掛上 ejs 樣板
app.set("view engine", "ejs");

// 掛上 bootstrap資源
// path -> 結合路徑
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")))
app.use(express.static(path.join(__dirname, "public")))

// session初始化
app.use(
    session({
        secret: 'loginpracticetest',
        resave: true,
        saveUninitialized: true,
        name: 'login',
        cookie: {
            maxAge: 10*60*1000 // 單位:毫秒
        }
    })
)

app.listen(3000, () => {
    console.log('Server is listen on port: 3000')
})

// login頁面渲染
app.get('/', (req, res) => {
    //預設session
    const user = 'Guest'
    req.session.account = user;
    res.render('login.ejs', {
        title: "Alex的賣場",
        userName: user
    })
})

// 登入post api
app.post('/login', (req, res) => {
    // 取得帳號密碼
    const account = req.body.account;
    const password = req.body.password;

    // 帳號密碼的驗證
    if (account === 'alex' && password === '123') {
        req.session.account = account;
        res.render('index.ejs', {
            title: "Alex的賣場",
            userName: req.session.account
        })
    } else {
        res.send('登入失敗，請重新登入')
    }
})

// 登出get api
app.get('/logout', (req, res) => {
    delete req.session.account
    res.redirect("/")
})