const express = require('express')
const router = new express.Router()
const JsonToCSV = require('json2csv').parse
const request = require('request')
// const admin = require('firebase-admin').initializeApp({
//     databaseURL: "https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app"
// });


router.get('/get-lessons-csv/:institute', async (req, res) => {
    const institute = req.params.institute
    request.get({
        url: `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/lessons/${institute}.json`,
        json: {}
    }, (err, response, body) => {
        if (err) {
            return res.status(400).send(err);
        } else if (response.statusCode === 200) {
            res.header("Content-Disposition", "attachment;filename=lessons.csv");
            res.type("text/csv");
            res.send(JsonToCSV(body));

        } else {
            console.log(response.statusCode);
        }
    })
})

// router.get('/disable-user/:uid', async (req, res) => {
//     res.send()
    
//     admin
// })


module.exports = router
