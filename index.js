const express =require('express')
const mongoose = require('mongoose')
const userRouter= require('./route/users')
const sensorRouter= require('./route/sensors')
const app=express()
const Port= process.env.port || 3000;
//established mongoose connection
mongoose.connect("mongodb+srv://dbUser:dbUser@cluster0.m9g2u.mongodb.net/dbUser?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected")
});
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(userRouter)
app.use(sensorRouter)

app.listen(Port,function(){
    console.log(`listening to port ${Port}`)
})