const express = require('express');

// 引入router
const clothesRouter = require('./routes/product')


// 呼叫express
const app = express();
const PORT = 5000

// 引入express server讀取靜態資源
app.use(express.static(__dirname + '/public'))
// 引入router
app.use('/product', clothesRouter)

// 設定 get api
app.get('/', (req, res) => {
    // status code
    res.status(200);
    res.send("Hello!")
}) 

// 啟動
app.listen(PORT, () => {
    console.log('Server is listen on port: ' + PORT)
})