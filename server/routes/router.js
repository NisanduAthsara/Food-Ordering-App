const express = require('express')
const app = express.Router()

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

module.exports = app