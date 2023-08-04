const express=require('express')
const app=express()
const Sequelize = require("sequelize");
const userRoute=require('./Routes/Routes')
const productRoute=require('./Routes/productRoute')
const cors=require('cors')
const upload = require('./Middleware/multer.config');
// const initDb = require('./db/db.sync');

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/upload',express.static('upload'))
app.use('/',userRoute)
app.use('/',productRoute)
// app.use(initDb)
app.listen(2020,() => console.log("Running at port 2020"))