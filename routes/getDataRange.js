var express = require("express");
var router = express.Router();

var electricModel = require("../config/models/electricModel");
var waterModel = require("../config/models/waterModel");

router.get("/", async (req, res) => {
  var { type, sensor_id, start_date, end_date } = req.query;
  
  var model;
  if (type == "elec") {
    model = electricModel;
  } else if (type == "water") {
    model = waterModel;
  } else {
    res.status(404).send("Invalid 'type' value.");
    return;
  }

  try {
    let startDate = new Date();
    startDate = start_date;
    let endDate = new Date();
    endDate = end_date;

    startDate = startDate.setHours(0,0,0,0);
    endDate = endDate.setHours(23,59,59,999);

    results = await model
      .find({
        sensor_id: sensor_id,
        timestamp: { $gte: startDate, $lte: endDate },
      })
      .sort({})
      .exec();
  } catch (error) {
    console.error("Error while retrieving data from database: ", error);
  }

  console.log(results);

  res.json(results);
});

module.exports = router;
