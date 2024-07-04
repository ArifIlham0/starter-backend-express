const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB connection successful!')).catch((err) => {console.log(err)})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use("/api/", authRoute) 
app.use("/api/users", userRoute)

app.listen(process.env.PORT || 5002, console.log(`Starter backend listening on port ${process.env.PORT}!`))