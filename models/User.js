const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
 
const user = new Schema (
    {
        fullName: {type: String},
        phoneNumber: {type: String},
        avatar: {type: String},
        role: {type: Number},

        position: {type: String},

        CV: {type: String},
        education: {type: String},
        introduction: {type: String},
        skills: {type: Array},
        speciality: {type: Array},
        achivements: {type: Array},
        professions: {type: Array}
    },
)

user.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('User', user);
