const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`connection established`.bold.cyan);
    }
    catch (err) {
        console.log("Can not connect to the database".red + err);
        process.exit(0);
    }
}

module.exports = { connectDb, };