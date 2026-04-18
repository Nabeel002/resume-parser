const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());

app.use(cookieParser());
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/user.routes');

connectDB()

const port = 4000;

app.use('/api/auth', authRoutes)
app.use('/api/user', profileRoutes)

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})