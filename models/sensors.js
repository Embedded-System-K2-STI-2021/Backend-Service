const mongoose = require('mongoose');
const { Schema } = mongoose;

const sensorSchema = new Schema({
    email: {
        type :String,
        required: true
    },
    name:{
        type :String,
        required: true
    },
    sensorData: [{ppm: Number,
                     date: {type: Date, default: Date.now }}]
},{timestamps:true});

const Sensor = mongoose.model('Sensor',sensorSchema)

module.exports= Sensor 