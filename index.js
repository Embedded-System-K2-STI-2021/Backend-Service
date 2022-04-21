const express =require('express')
const mongoose = require('mongoose')
const userRouter= require('./route/users')
const sensorRouter= require('./route/sensors')
const cors = require('cors');
const app=express()
//established mongoose connection
mongoose.connect("mongodb+srv://lasti:lasti@cluster0.49yn8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected")
});
app.use(cors({
  origin: ['*']
}));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(userRouter)
app.use(sensorRouter)
const port=process.env.PORT || 5001
app.listen(port,function(){
    console.log(`listening to port ${port}`)
})