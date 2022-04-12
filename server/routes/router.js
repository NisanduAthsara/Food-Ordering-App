const express = require('express')
const app = express.Router()
const signup = require('../controller/signup')

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup',{username:req.cookies.uname,email:req.cookies.uemail,password:req.cookies.pwd,address:req.cookies.address,tel_no1:req.cookies.tel_no1,tel_no2:req.cookies.tel_no2})
})

app.post('/api/signup',signup.signup)

module.exports = app