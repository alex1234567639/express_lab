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

app.get('/', (req, res)=>{
    res.render('index.ejs');
})

mongoClient.connect('mongodb://127.0.0.1:27017/test').then((client)=>{
    console.log('DB Conneted!');

    // 取得db / collection
    const db = client.db('admin');
    const adminCollection = db.collection('admin')

    // C -create
    app.post('/admin', (req, res)=>{
        adminCollection.insertOne(req.body).then(() =>{
            res.send('Create successfully!');
        }).catch((err)=>{
            console.log(err);
        })
    })

    // R -read
    app.get('/admin', (req, res)=>{
        adminCollection.find().toArrary.then(result =>{
            res.json(result);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // U -update
    app.patch('/admin', (req, res)=>{
        const adminData = req.body;
        adminCollection.findOneAndUpdate(
            { name: adminData.name },
            { $set: { age: adminData.age } }
        ).then(() =>{
            res.send('Update successfully!');
        }).catch((err)=>{
            console.log(err);
        })
    })

    // D -delete
    app.delete('/admin', (req, res)=>{
        adminCollection.deleteOne( { name: req.body.data.name }).then(() =>{
            res.send('Delete successfully!');
        }).catch((err)=>{
            console.log(err)
        })
    })
})
