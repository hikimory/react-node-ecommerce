const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('./config')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
const uploadRoute = require('./routes/uploadRoute')

const PORT = config.PORT
const app = express()

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use("/api/users", userRoute)
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
})
app.use('/api/uploads', uploadRoute);

app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

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