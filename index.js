const express = require("express")
const app = express()

app.get('/', (req,res) => {
    res.send("<h1>Header heress</h1>")
})
console.log( process.env.port, 'port env')
const port= process.env.port || 4001
app.listen(port, ()=> console.log(`${port} running`))