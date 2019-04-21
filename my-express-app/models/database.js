const mongoose = require('mongoose');
const config = require('../config')

class DatabasConnection {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(`mongodb+srv://${config.username}:${config.password}@cluster0-jbxu8.mongodb.net/inventory?retryWrites=true`, { useNewUrlParser: true })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new DatabasConnection()