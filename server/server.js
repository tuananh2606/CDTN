const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
var bodyParse = require('body-parser')
const connectDatabase = require('./config/database');

const app = express();
//  CONFIG
dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT || 1000;

connectDatabase();

app.use(bodyParse.json({limit: "50mb"}));
app.use(morgan('common'));

//ROUTES
const product = require('./routes/productRoute');
const category = require('./routes/categoryRoute')

app.use("/v1/product", product)
app.use("/v1/category", category)

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });