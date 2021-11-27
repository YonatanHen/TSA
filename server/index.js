const express = require('express')
const cors = require('cors')
const mailsRouter = require('./routers/mails')
const imagesRouter = require('./routers/images')
const notificationsRouter = require('./routers/notifications')
const adminRouter = require('./routers/admin')
const app = express()

app.use(express.json())
app.use(mailsRouter)
app.use(imagesRouter)
app.use(notificationsRouter)
app.use(adminRouter)
app.use(cors())

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`app is listen to ${port}`)
})

app.get('/login', async (req, res) => {
    console.log('login')
    res.send("your'e logged in")
})

app.get('/*', async (req, res) => {
    res.send('TSA server')
})