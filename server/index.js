const express = require('express')
const cors = require('cors')
const mailsRouter = require('./routers/mails')
const imagesRouter = require('./routers/images')
const notificationsRouter = require('./routers/notifications')
const app = express()

app.use(express.json())
app.use(mailsRouter)
app.use(imagesRouter)
app.use(notificationsRouter)
app.use(cors())

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`app is listen to ${port}`)
})

app.get('/login', async (req, res) => {
    console.log('logiin')
    res.send("your'e logged in")
})

app.get('/*', async (Req, res) => {
    res.send('TSA server')
})