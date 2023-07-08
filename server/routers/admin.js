const express = require('express')
const router = new express.Router()
const JsonToCSV = require('json2csv').parse
const request = require('request')

router.get('/get-lessons-csv/:institute', async (req, res) => {
    const institute = req.params.institute
    request.get({
        url: `${process.env.DATABASE_URL}/lessons/${institute}.json`,
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
