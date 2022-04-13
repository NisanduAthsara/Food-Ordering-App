const express = require('express')
const app = express.Router()
const signup = require('../controller/signup')
const login = require('../controller/login')
const logout = require('../controller/logout')
const foods = require('../controller/foods')

app.get('/',(req,res)=>{
    res.render('index',{user:req.session.username,id:req.cookies.id})
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup',{username:req.cookies.uname,email:req.cookies.uemail,password:req.cookies.pwd,address:req.cookies.address,tel_no1:req.cookies.tel_no1,tel_no2:req.cookies.tel_no2})
})

app.post('/api/signup',signup.signup)

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/api/login',login.login)

app.get('/admin/dashboard',(req,res)=>{
    res.render('dashboard')
})

app.get('/admin/foods',(req,res)=>{
    res.render('foods')
})

app.get('/admin/new-food',(req,res)=>{
    res.render('new-food')
})

app.post('/api/new-food',foods.addFood)

app.get('/logout',logout)

module.exports = app