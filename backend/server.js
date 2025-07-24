const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const skillRoutes = require("./routes/skill.routes")

const app = express()
const PORT = process.env.PORT || 7461

app.use(express.json())

connectDB()

app.use("/api/skills", skillRoutes)

app.listen(PORT, ()=> {
    console.log(`Skills server is running on port ${PORT}`)
})