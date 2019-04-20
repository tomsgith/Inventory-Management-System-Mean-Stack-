//dependency
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const authRoute = require('./Routes/AuthRoute')
const productSales = require('./Routes/ProductRoute')
const salesRoute = require('./Routes/SalesRoute')


//init
const app = express()

//setup
app.use(express.json());
app.use(cors())
app.use(helmet())

//middleware 
app.use('*', async function (req, resp, next) {
    try {
        const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
        await client.connect();
        const db = await client.db('inventory');
        req.collection = db.collection("warehouse")
    } catch (e) {
        return next(400)
    }
    return next()
})

app.post('*', function (req, resp, next) {
    try {
        if (Object.keys(req.body).length === 0) {
            throw new Error('Invalid data from user.');
        }
    } catch (e) {
        return next(400)
    }
    return next()
})

//routing
app.use('/api/auth', authRoute)
app.use('/api/sales', salesRoute)
app.use('/api/products', productSales)

//error handling 
app.use(function (err, req, resp, next) {
    if (err === 400) {
        resp.status(400).send('Bad Request.')
        resp.end()
    }
    else {
        resp.status(500).send('New Internal Server Error.')
        resp.end()
    }
})

//boot
app.listen(3000, () => console.log('Listening at 3000'))