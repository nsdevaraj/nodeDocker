const express = require("express")
const mongoose = require("mongoose")
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PWD } = require("./config/config")

const app = express()
const mongourl = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectRetry = () => {
    mongoose
        .connect(mongourl)
        .then(() => console.log('connected now s!'))
        .catch((e) => {
            console.log(e)
            setTimeout(() => {
                connectRetry()
            }, 5000);
        })
}
connectRetry()
app.get('/', (req, res) => {
    res.send("<h1>mongooo Header here!</h1>")
})
console.log(process.env.PORT, 'port env')
const port = process.env.PORT || 4001
app.listen(port, () => console.log(`${port} running`))