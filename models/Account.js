const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

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

account.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Account', account);
