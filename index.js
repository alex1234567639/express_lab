const express = require('express');
// 呼叫express
const app = express();
const PORT = 5000

// 引入express server讀取靜態資源
app.use(express.static(__dirname + '/public'))

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