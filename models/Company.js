const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const company = new Schema (
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

company.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Company', company);
