const express = require('express')
const router = new express.Router()

router.post('/notify-students', async (req,res) => {
    const { studentsQueue, tutorName } = req.body
    console.log(studentsQueue)
    console.log('Hi')

    res.send()
})

module.exports = router
