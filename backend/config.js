const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this,__dirname, '/../');
dotenv.config({ path: root('.env') });

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazona',
    JWT_SECRET: process.env.JWT_SECRET || 'something secret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb'
};