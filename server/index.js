const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`app is listen to ${port}`)
})

app.get('/login', async(req,res) => {
    console.log('logiin')
    res.send("your'e logged in")
})

app.get('/*', async(Req,res) => {
    res.send('TSA server')
})