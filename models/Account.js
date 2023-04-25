const mongoose = require('mongoose')

const Schema = mongoose.Schema
mongoose.set('strictQuery', false)
 
const account = new Schema (
    {
        email: {type: String, required: true, unique: true},
        password: {type: String}
    },
    { _id: false }
)

module.exports = mongoose.model('Account', account);
