const express = require('express')
const data = require('./data')

const app = express()

app.get('/api/products', (req, res) => {
    res.send(data)
})
app.listen(5000, () => console.log('Server has been started...'))