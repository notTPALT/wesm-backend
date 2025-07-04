var mongoose = require('mongoose');

function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        mongoose.pluralize(null);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
        console.log(`Database connected.`);
    });
    
    dbConnection.on("error", (err) => {
        console.error(`connection error: ${err}`);
    });
    return;
}

module.exports = connectDB;