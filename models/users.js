const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type :String,
        required: true
    },
    email: {
        type :String,
        required: true,
        unique: true
    },
    password: {
        type :String,
        required: true
    },
    status: {
        type :String,
        enum: ['room', 'observer'],
        required: true
    },
    rooms:[{email:String}],
    observers:[{email:String}]
},{timestamps:true});

const User = mongoose.model('User',userSchema)

module.exports= User 