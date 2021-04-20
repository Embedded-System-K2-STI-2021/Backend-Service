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
        enum: ['patient', 'observer'],
        required: true
    },
    patients:[{email:String}],
},{timestamps:true});

const User = mongoose.model('User',userSchema)

module.exports= User 