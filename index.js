const express = require('express');
const session = require('express-session')

// 引入router
const clothesRouter = require('./routes/product')
const teacherRouter = require('./routes/teacher')
const studentRouter = require('./routes/student')


// 呼叫express
const app = express()
const PORT = 5000

// middleware express session
app.use(
    session({
        secret: 'sessiontestsceret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 10*60*1000 // 單位:毫秒
        }
    })
)
// 將資料塞入session
app.get('/', (req, res) => {
    req.session.account = 'Alex'
    console.log(req.session.account)
    res.send(`Hello ${req.session.account}`)
})
app.get('/cookie', (req, res) => {
    res.send(`Hello ${req.session.account}`)
})

const serverLogMiddleWare = (req, res, next) => {
    // 紀錄server資訊
    // req.method -> request的http方法
    // req.url -> requset的路徑(router)
    console.log(`log:[${req.method}]:${req.url} --- ${new Date().toISOString()}`)
    if (req.method === 'GET' && req.url === '/') {
        console.log('log:[warning]: this url is not found')
    }
    next()
}
// Note: 身分驗證 一但身分錯誤就無法看到內容
// const validationMiddleWare = (req, res, next) => {
//     if (req.query.username !== 'Alex') {
//         res.status(401)
//         res.json({'message': 'Verify failed.'})
//     } else {
//         next()
//     }
// }

app.use(serverLogMiddleWare)
// app.use(validationMiddleWare)

// 設定ejs樣板引擎
app.set('view engine', 'ejs')

// 引入express server讀取靜態資源
app.use(express.static(__dirname + '/public'))
// 引入router
app.use('/product', clothesRouter)
app.use('/teacher', teacherRouter)
app.use('/student', studentRouter)

// 設定 get api
app.get('/', (req, res) => {
    // status code
    res.status(200);
    res.send("Hello!")
}) 

// 設定錯誤訊息api
app.get('/error-500', (req, res) => {
    const message = {'message': 'Server is stop now, something is wrong.'}
    res.status(500)
    res.json(message)
})
app.get('/error-404', (req, res) => {
    const message = {'message': 'Not found!'}
    res.status(404)
    res.json(message)
})


// render 
app.get('/', (req, res) => {
    res.render('index.ejs');
})
// 啟動
app.listen(PORT, () => {
    console.log('Server is listen on port: ' + PORT)
})
