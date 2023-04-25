const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

async function connect() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            dbName: process.env.DBNAME,
            useUnifiedTopology: true,
        })
        console.log('Connect successful to database')
    }
    catch (err) {
        console.log('Connect database error' + err)
    }
}

module.exports = { connect };
