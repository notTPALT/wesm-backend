// var express = require('express');
// var router = express.Router();

// var electricModel = require ('../config/models/electricModel');

// router.get('/', async (req, res) => {
//     const { sensor_id, node_id } = req.query;
//     let oldDate = new Date();
//     oldDate.setDate(1);
//     const oldElectric = await electricModel.find({ sensor_id: sensor_id, node_id: node_id, timestamp: { $gte: oldDate } }).limit(1);
//     console.log(oldElectric);

//     res.json(oldElectric);
// });

// module.exports = router;
