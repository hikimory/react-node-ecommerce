const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
})

module.exports = model('User', schema)