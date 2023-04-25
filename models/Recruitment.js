const mongoose = require('mongoose')

const Schema = mongoose.Schema
 
const recruitment = new Schema (
    {
        title: {type: String},
        image: {type: String},
        createdAt: {type: Date},
        address: {
            street: String,
        },
        salary: {type: String},
        slug: {type: String},
        experience: {type: String},
        workingWay: {type: String},
        description: {type: String},
        position: {type: String},
        requirement: {type: String},
        benefit: {type: String},
        deadlineSubmis: {type: Date},
        profession: {type: String}
    },
)

module.exports = mongoose.model('Recruitment', recruitment);
