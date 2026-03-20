const express = require('express');
const app = express();
app.use(express.json())
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth.routes')

connectDB()

const port = 4000;

app.use('/api/auth', authRoutes)


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})