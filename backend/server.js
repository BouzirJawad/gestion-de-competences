const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config()
const skillRoutes = require("./routes/skill.routes")

const app = express()
const PORT = process.env.PORT || 7460

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/skills", skillRoutes)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})