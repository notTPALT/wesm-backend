// var express = require('express');
// var router = express.Router();

// var waterModel = require('../config/models/waterModel');

// router.get('/', async (req, res) => {
//     const { sensor_id, node_id } = req.query;
//     let oldDate = new Date();
//     oldDate.setDate(1);
//     const oldWater = await waterModel.find({ sensor_id: sensor_id, node_id: node_id, timestamp: { $gte: oldDate } }).limit(1);
//     console.log(oldWater);

//     res.json(oldWater);
// });

// module.exports = router;