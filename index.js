const express = require("express")
const app = express()

app.get('/', (req,res) => {
    res.send("<h1>Header here</h1>")
})
const port= process.env.port || 3000
app.listen(port, ()=> console.log(`${port} running`))