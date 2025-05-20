var express = require('express');
var router = express.Router();

var electricModel = require('../config/models/electricModel');
var waterModel = require('../config/models/waterModel');


// Get data 
router.get('/', async (req, res) => {
    var { type, node_id, sensor_id, date, rows } = req.query;

    var model;

    if (type == 'elec') {
        model = electricModel;
    } else if (type == 'water') {
        model = waterModel;
    } else {
        res.status(404).send("Invalid 'type' value.");
        return;
    }

    if (rows === undefined) {
        rows = 1;
    }

    var results;
    if (date === undefined) {
        results = await model.find({ sensor_id: sensor_id, node_id: node_id }).sort({ _id: -1 }).limit(rows).exec();
    } else {
        let requestDate = new Date();
        requestDate.setDate(date);
        console.log(requestDate);
        requestDate = requestDate.toISOString().slice(0, 10);

        results = await model.find({ sensor_id: sensor_id, node_id: node_id, timestamp: { $gte: requestDate } }).limit(rows);
    }

    console.log(results);

    res.json(results);
});

module.exports = router;
