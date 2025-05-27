var express = require("express");
var router = express.Router();

var electricModel = require("../config/models/electricModel");
var waterModel = require("../config/models/waterModel");

async function getUsageLast30Days(type) {
  var results = [];
  var model, nodeId, resourceType;

  if (type == "elec30") {
    model = electricModel;
    nodeId = "node_2";
    resourceType = "power";
  } else if (type == "water30") {
    model = waterModel;
    nodeId = "node_1";
    resourceType = "water";
  }

  try {
    results = await model
      .aggregate([
        {
          $match: {
            node_id: nodeId,
            timestamp: {
              $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        },
        { $group: { _id: 1, total_usage: { $sum: `$${resourceType}` } } },
        { $project: { _id: 0, total_usage: 1 } },
      ])
      .exec();
    // console.log(results);
  } catch (error) {
    console.error("Error while getting total usage: ", error);
  }
  
  return results;
}

router.get("/", async (req, res) => {
  var { type, node_id, sensor_id, date, rows } = req.query;

  var model;

  if (type == "elec30" || type == "water30") {
    res.json(await getUsageLast30Days(type));
    return;
  }

  if (type == "elec") {
    model = electricModel;
  } else if (type == "water") {
    model = waterModel;
  } else {
    res.status(404).send("Invalid 'type' value.");
    return;
  }

  if (rows === undefined) {
    rows = 1;
  }

  var results;
  try {
    if (date === undefined) {
      results = await model
        .find({ sensor_id: sensor_id, node_id: node_id })
        .sort({ _id: -1 })
        .limit(rows)
        .exec();
    } else {
      let requestDate = new Date();
      requestDate.setDate(date);
      requestDate = requestDate.toISOString().slice(0, 10);

      results = await model
        .find({
          sensor_id: sensor_id,
          node_id: node_id,
          timestamp: { $gte: requestDate },
        })
        .limit(rows)
        .exec();
    }
  } catch (error) {
    console.error("Error while retrieving data from database: ", error);
  }

  console.log(results);

  res.json(results);
});

module.exports = router;
