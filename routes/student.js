const express = require('express');
const router = express.Router();

router.get('/information', (req, res, next) => {
    const studentInfo = {
        'name': 'Henry',
        'age': 22,
        'department': 'Conputer Science'
    }
    res.json(studentInfo);
})

module.exports = router; 