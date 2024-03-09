const express = require('express')
const app = express()
const cors = require('cors')

const userRoutes = require('./routes/user.routes')
const categoryRoutes = require('./routes/category.routes')
const productRoutes = require('./routes/product.routes')
const orderRoutes = require('./routes/order.routes')

app.use(express.json())
app.use(express.static('public'))

app.use(cors())

app.use([userRoutes, categoryRoutes, productRoutes, orderRoutes])


module.exports = app;