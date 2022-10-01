const express = require("express")
const mongoose = require("mongoose")
const app = express()
mongoose.connect("mongodb://dev:pwd@192.168.80.2:27017/?authSource=admin").then(()=>console.log('connected')).catch((e)=>console.log(e))
app.get('/', (req,res) => {
    res.send("<h1>mongoooHeader here!</h1>")
})
console.log( process.env.port, 'port env')
const port= process.env.port || 4001
app.listen(port, ()=> console.log(`${port} running`))