const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
let connectRedis = require('connect-redis');

const cookieParser = require('cookie-parser');
const redis = require("redis")

let RedisStore = connectRedis(session); 
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PWD, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config")

let redisClient = redis.createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT
    }
})
redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', err => console.error('ERR:REDIS:', err));

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

connectRedis = async () => {

    try {
        redisClient.connect();
    } catch (error) {
        console.log(error)
    }

}
connectRedis()

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false, 
        cookie: {
            secure: false, // if true: only transmit cookie over https, in prod, always activate this
            httpOnly: true, // if true: prevents client side JS from reading the cookie
            maxAge: 1000 * 30, // session max age in milliseconds 30 secs 
        },
    })
);

app.use(express.json())

app.use(cookieParser());

//localhost:3000/posts
app.use("/posts", postRouter)
app.use("/users", userRouter)

const port = process.env.PORT || 4001
console.log(process.env.PORT, 'port env')
app.listen(port, () => console.log(`${port} running now`))