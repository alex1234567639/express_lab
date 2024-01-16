const express = require('express');
const router = express.Router();

router.get('/information', (req, res, next) => {
    const teacherInfo = {
        'name': 'Alex',
        'age': 28,
        'course': 'Math',
        'email': 'alex123456789@gmail.com'
    }
    res.json(teacherInfo);
})

module.exports = router; 
