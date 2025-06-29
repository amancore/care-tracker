const mongoose = require('mongoose');

function connectDB() {
    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = { connectDB };
