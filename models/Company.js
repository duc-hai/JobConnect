const mongoose = require('mongoose')


const Schema = mongoose.Schema

const comapny = new Schema (
    {
        name: {type: String},
        address: {type: String},
        website: {type: String},
        employees: {type: Number},
        introduction: {type: String},
        logo: {type: String},
        coverImg: {type: String},
        slug: {type: String},
        idUser: {type: String}
    },
)

module.exports = mongoose.model('Company', comapny);
