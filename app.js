const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var path = require('path')
const productRoutes = require('./index')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()) //=> res.body


app.use(express.static(path.join(__dirname, '/../public')));
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'PUT')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST', 'PATCH', 'DELETE', 'GET', 'PUT')
        return res.status(200).json({});
    }
    next();
})

app.use('/users', productRoutes)

app.use((req, res, next) => {
    const error = new Error('NOT here');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app