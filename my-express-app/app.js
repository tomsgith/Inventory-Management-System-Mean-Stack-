//dependency
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const authRoute = require('./Routes/AuthRoute')
const productSales = require('./Routes/ProductRoute')
const salesRoute = require('./Routes/SalesRoute')
const supplierRoute = require('./Routes/SupplierRoute')
const config = require('./config')
const jwt = require('jsonwebtoken')
const DatabasConnection = require('./models/database')

//init
const app = express()

//setup
app.use(express.json());
app.use(cors())
app.use(helmet())

DatabasConnection._connect()

//middleware
app.use('*', async function (req, resp, next) {
    if (!req.originalUrl.includes('/api/') || req.originalUrl.includes('/api/auth'))
        return next()
    else {
        const token = req.headers.authorization
        if (!token) {
            return resp.status(200).send({ auth: false, message: 'No token provided' });
        } else {
            await jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return resp.status(200).send({ auth: false, message: 'Unauthorized' })
                }
                return next()
            });
        }
    }
})

//routing
app.use('/', express.static('public'))
app.use('/api/auth', authRoute)
app.use('/api/sales', salesRoute)
app.use('/api/product', productSales)
app.use('/api/supplier', supplierRoute)

//error handling 
app.use(function (err, req, resp, next) {
    if (err) {
        console.log(err)
    }
})

//boot
app.listen(3000, () => console.log('Listening at 3000'))