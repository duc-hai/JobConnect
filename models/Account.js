const mongoose = require('mongoose')

const Schema = mongoose.Schema
mongoose.set('strictQuery', false)
 
const account = new Schema (
    {
        email: {type: String, required: true, unique: true, index: true},
        password: {type: String},
        idUser: {type: String, required: true}
    },
    // { _id: false }
)

module.exports = mongoose.model('Account', account);
