const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index', {title:'To-DO'})
})

module.exports = router;