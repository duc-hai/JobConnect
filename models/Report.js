const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

var datetime = new Date()
datetime.setHours(datetime.getHours() + 7)

const report = new Schema(
    {
        userReport: {type: String},
        typeReport: {type: String},
        idReport: {type: String},
        description: {type: String},
        images: {type: Array}
    },
    {
        timestamps: true,
    },
)

//Middlewares set correctly current datetime
report.pre('save', function (next) {
    this.updatedAt = datetime
    this.createdAt = datetime
    next()
})

report.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Report', report);
