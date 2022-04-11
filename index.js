const express = require('express')
const app = express()
const dotenv = require('dotenv/config')
const routes = require('./server/routes/router')
const path = require('path')

const PORT = process.env.PORT || 3000

app.use(routes)

app.set('view engine','ejs');

app.use('/css',express.static(path.join(__dirname,'assets/css')))
app.use('/img',express.static(path.join(__dirname,'assets/img')))

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})