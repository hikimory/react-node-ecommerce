const express = require('express')
const mongoose = require('mongoose')
const data = require('./data')
const config = require('./config')
const userRoute = require('./routes/userRoute')

const PORT = config.PORT
const app = express()

app.use(express.json())

app.use("/api/users", userRoute)
app.get('/api/products', (req, res) => {
    res.send(data)
})

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.find(x => x._id === productId);
    if (product)
      res.send(product);
    else
      res.status(404).send({ msg: "Product Not Found." })
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