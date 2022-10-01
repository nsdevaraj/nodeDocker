const express = require("express")
const mongoose = require("mongoose")
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PWD } = require("./config/config")
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
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
    res.send("<h1>mongooo Headers here!!</h1>")
})
app.use(express.json())
console.log(process.env.PORT, 'port env')
//localhost:3000/posts
app.use("/posts", postRouter)
app.use("/users", userRouter)
const port = process.env.PORT || 4001
app.listen(port, () => console.log(`${port} running`))