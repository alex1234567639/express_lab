const express = require('express');

// 引入router
const clothesRouter = require('./routes/product')
const teacherRouter = require('./routes/teacher')
const studentRouter = require('./routes/student')


// 呼叫express
const app = express();
const PORT = 5000

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