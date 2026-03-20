const express = require('express');
const app = express();
const connectDB = require('./config/db')


connectDB()

const port = 4000;

app.get('/',(req, res)=>{
    res.send('hello world')
})


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})