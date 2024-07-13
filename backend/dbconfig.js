const mongoose = require("mongoose")

async function connectToMongo() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/food")
        console.log(`Connected to MongoDB`)
    } catch (error) {
        console.log(`error occured ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectToMongo;