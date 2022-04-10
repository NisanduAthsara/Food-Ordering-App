const express = require('express')
const app = express()
const dotenv = require('dotenv/config')
const routes = require('./server/routes/router')

const PORT = process.env.PORT || 3000

app.use(routes)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})