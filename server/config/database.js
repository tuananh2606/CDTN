const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.DB_LOCAL_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongo Connected: ${connect.connection.host}`)
        
    } catch (err) {
        console.log(`Error: ${err.message}`)
        
    }
}

module.exports = connectDB;