const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("MongoDB is Connected"))
    } catch (error) {
        console.log("Error connecting MongoDB", error)
    }
}

module.exports = connectDB
