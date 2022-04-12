const express = require('express')
const app = express()
const dotenv = require('dotenv/config')
const routes = require('./server/routes/router')
const path = require('path')
const mongoose = require('mongoose')
const cookie_parser = require('cookie-parser')

const PORT = process.env.PORT || 3000

app.use(cookie_parser());

app.use(express.urlencoded({extended:true}))

//connect to the database
try{
    mongoose.connect(process.env.MONGO,{useNewUrlParser:true},()=>{
        console.log('DB connected');
    })
}catch(err){
    console.log(err);
}

app.use(routes)

app.set('view engine','ejs');

app.use('/css',express.static(path.join(__dirname,'assets/css')))
app.use('/img',express.static(path.join(__dirname,'assets/img')))
app.use('/js',express.static(path.join(__dirname,'assets/js')))

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})