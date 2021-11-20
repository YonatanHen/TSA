const express = require('express')
const router = new express.Router()
const JsonToCSV = require('json2csv').parse
const request = require('request')

router.get('/get-lessons-csv/:institute', async (req, res) => {
    const institute = req.params.institute
    console.log(institute)
    let data

    request.get({
        url: `https://students-scheduler-default-rtdb.europe-west1.firebasedatabase.app/lessons/${institute}.json`,
        json: {}
    }, (err, response, body) => {
        if (err) {
            return res.status(400).send(err);
        } else if (response.statusCode === 200) {
            const csv = JsonToCSV(body)
            res.header("Content-Disposition", "attachment;filename=lessons.csv");
            res.type("text/csv");
            res.send(csv);

        } else {
            console.log(response.statusCode);
        }
    })
})


module.exports = router
