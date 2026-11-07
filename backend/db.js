const mongoose = require('mongoose');


const connectToMongo =async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        throw new Error('MONGO_URI environment variable is required');
    }
    await mongoose.connect(mongoURI)
    console.log("Connected to MongoDB successfully")    
};

module.exports = connectToMongo;
