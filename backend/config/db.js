const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        require('dotenv').config();
        console.log("Mongo URI:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose.
// It exports a function that attempts to connect to the database using the URI stored in the environment
// variable `MONGO_URI`. If the connection is successful, it logs a success message;
// if it fails, it logs the error message and exits the process with a failure code.
// The connection options `useNewUrlParser` and `useUnifiedTopology` are used to avoid deprecation warnings
// related to the MongoDB driver's connection handling.