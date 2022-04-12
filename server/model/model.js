const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    username:{
        type:'String',
        required:true
    },
    email:{
        type:'String',
        required:true,
        unique:true
    },
    password:{
        type:'String',
        required:true
    },
    address:{
        type:'String',
        required:true
    },
    tel_no1:{
        type:'String',
        required:true
    },
    tel_no2:{
        type:'String',
        required:true
    },
    user_type:{
        type:'String',
        default:'User',
        required:true
    }
})

module.exports = mongoose.model('users',Schema)