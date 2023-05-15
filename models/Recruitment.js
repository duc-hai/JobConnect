const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const slug = require('mongoose-slug-generator')

const Schema = mongoose.Schema
 
var datetime = new Date()
datetime.setHours(datetime.getHours() + 7)

const recruitment = new Schema (
    {
        title: {type: String},
        image: {type: String},
        createdAt: {type: Date},
        address: {
            street: String,
            district: String,
            province: String,
        },
        salary: {type: String},
        slug: {type: String, slug: "title"},
        experience: {type: String},
        workingWay: {type: String},
        description: {type: String},
        position: {type: String},
        requirement: {type: String},
        benefit: {type: String},
        deadlineSubmis: {type: Date},
        profession: {type: Number},
        idCompany: {type: String},
        appliedUser: {type: Array},
    },
    {
        timestamps: true,
    },
)

recruitment.index({title: 'text'}) //create an index to support text search

//Middlewares set correctly current datetime
recruitment.pre('save', function (next) {
    this.updatedAt = datetime
    this.createdAt = datetime
    next()
})

recruitment.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: datetime });
    next()
})

mongoose.plugin(slug)
recruitment.plugin(mongooseDelete, {
    deletedAt: true,
    validateBeforeDelete: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Recruitment', recruitment);
