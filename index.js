const express = require("express")
const mongoose = require("mongoose")
const session =require("express-session")
const redis = require("redis")

let RedisStore = require("connect-redis")(session)
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PWD, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config")

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

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
/*
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie:{
        secure:false,
        //resave:false,
        //saveUninitialized: false,
        httpOnly:true,
        maxAge: 30000
    }
}))*/

app.use(express.json())


//localhost:3000/posts
app.use("/posts", postRouter)
app.use("/users", userRouter)

const port = process.env.PORT || 4001
console.log(process.env.PORT, 'port env')
app.listen(port, () => console.log(`${port} running`))