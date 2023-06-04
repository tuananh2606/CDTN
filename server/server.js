const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDatabase = require('./config/database');

const app = express();
//  CONFIG
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 1000;

connectDatabase();

app.use(cors());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());

// app.use(bodyParse.json({ limit: '50mb' }));
app.use(morgan('common'));

//ROUTES
const product = require('./routes/productRoute');
const category = require('./routes/categoryRoute');
const authRoute = require('./routes/authRoute');
const user = require('./routes/userRoute');

app.use('/v1/product', product);
app.use('/v1/category', category);
app.use('/v1/auth', authRoute);
app.use('/v1/user', user);

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
