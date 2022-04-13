const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    name:{
        type:'String',
        required:true
    },
    price:{
        type:'String',
        required:true
    },
    delivery_time:{
        type:'String',
        required:true
    },image:{
        type:'String',
        required:true
    },image_ext:{
        type:'String',
        required:true
    },status:{
        type:'String',
        required:true,
        default:'Active'
    }
})

module.exports = mongoose.model('foods',Schema)