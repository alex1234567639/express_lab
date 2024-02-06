const express = require('express');
// 解析前端req裡面的body
const bp = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

const PORT = 3000;

app = express();

// 掛上 ejs 樣板
app.set("view engine", "ejs");
// body-parser
app.use(bp.urlencoded());
app.use(bp.json());


app.listen(PORT, () => {
    console.log('Server is listen on port: 3000');
})

mongoClient.connect('mongodb://127.0.0.1:27017/test').then((client)=>{
    console.log('DB Conneted!');

    // 取得db / collection
    const db = client.db('admin');
    const adminCollection = db.collection('admin')

    // CRUD
    app.post('/admin', (req, res)=>{
        adminCollection.insertOne(req.body).then(result =>{
            res.send('Create successfully!')
        }).catch((err)=>{
            console.log(err)
        })
    })
})
