const express = require('express')
const router = express.Router(); // Router是express裡面的一個api

// 如果 router 裡有 function 或 middleware，則在最後一行加上 next 執行下一個程式
router.get('/clothes', (req, res, next) => {
    const clothesArray = []
    const clothes = {
        "name": "T-shirt",
        "price": 200,
        "inventory": 10
    }
    const clothes2 = {
        "name": "shirt",
        "price": 500,
        "inventory": 10
    }
    clothesArray.push(clothes)
    clothesArray.push(clothes2)

    res.json(clothesArray);
})

// 重點: export router
module.exports = router;
