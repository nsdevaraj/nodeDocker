const express = require("express")
const app = express()

app.get('/', (req,res) => {
    res.send("<h1>Header here</h1>")
})
const port= process.env.port || 4000
app.listen(port, ()=> console.log(`${port} running`))