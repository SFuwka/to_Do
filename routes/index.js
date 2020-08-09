const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'To-DO' })
})

router.get('/404', (req, res, next) => {
    res.render('404',{ title: 'Ooops'})
})

module.exports = router;