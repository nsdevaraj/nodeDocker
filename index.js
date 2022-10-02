const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")

const cookieParser = require('cookie-parser');
const redis = require("redis")

let RedisStore = require("connect-redis")(session)
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PWD, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config")

let redisClient = redis.createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT
    }
})
/*
redisClient.connect();
redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', err => console.error('ERR:REDIS:', err));
*/
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
 
app.use(
   session({
     store: new RedisStore({ client: redisClient}),
     resave:false,
     saveUninitialized:false,
     secret:SESSION_SECRET,
     cookie:{
       httpOnly:true,
       maxAge: 30000,
       secure:false
     },
   })
 ); 

app.use(express.json())

//app.use(cookieParser());

//localhost:3000/posts
app.use("/posts", postRouter)
app.use("/users", userRouter)

const port = process.env.PORT || 4001
console.log(process.env.PORT, 'port env')
app.listen(port, () => console.log(`${port} running`))