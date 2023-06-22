const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
// const streamifier = require('streamifier');
const fs = require('fs');

const cloudinary = require('./cloudinary');
const connectDatabase = require('./config/database');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

exports.upload = multer({ storage: storage });

const app = express();
//  CONFIG
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 1000;

connectDatabase();
app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }));
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());
app.use(morgan('common'));

//ROUTES
const product = require('./routes/productRoute');
const category = require('./routes/categoryRoute');
const authRoute = require('./routes/authRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use(express.static('public'));
app.use('/v1/product', product);
app.use('/v1/category', category);
app.use('/v1/auth', authRoute);
app.use('/v1/user', user);
app.use('/v1/order', order);

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
