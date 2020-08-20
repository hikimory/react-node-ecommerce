const express = require('express')
const mongoose = require('mongoose')
const data = require('./data')
const config = require('./config')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')

const PORT = config.PORT
const app = express()

app.use(express.json())

app.use("/api/users", userRoute)
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

async function start()
{
    try {
        await mongoose.connect(config.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
          })
          app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
    }
}

start()