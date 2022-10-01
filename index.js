const express = require("express")
const mongoose = require("mongoose")
const {MONGO_IP, MONGO_PORT, MONGO_USER,MONGO_PWD} = require("./config/config")
 
const app = express()
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`).then(()=>console.log('connected now')).catch((e)=>console.log(e))
app.get('/', (req,res) => {
    res.send("<h1>mongoooHeader here!</h1>")
})
console.log( process.env.PORT, 'port env')
const port= process.env.PORT || 4001
app.listen(port, ()=> console.log(`${port} running`))