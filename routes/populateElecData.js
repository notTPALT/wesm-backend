var express = require("express");
var router = express.Router();
const electricModel = require("../config/models/electricModel");

async function populateData() {
  try {
    // Generate 60 random power values between 1 and 1000, sorted in ascending order
    const powerValues = Array.from(
      { length: 60 },
      () => Math.random() * 999 + 1
    ).sort((a, b) => a - b);

    today = new Date();
    // Set start date to 59 days ago
    const startDate = new Date();
    startDate.setDate(today.getDate() - 59);

    // Create documents array
    const documents = [];
    for (let day = 0; day < 60; day++) {
      const date = new Date(startDate);
      date.setUTCDate(startDate.getUTCDate() + day);
      const seconds = Math.floor(Math.random() * 60);
      date.setUTCHours(1, 30, seconds, 0);

      const doc = {
        sensor_id: "power1",
        node_id: "node_2",
        timestamp: date,
        power: powerValues[day],
        voltage: 220,
      };
      documents.push(doc);
    }

    // Insert all documents into the database
    await electricModel.insertMany(documents);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data", err);
  }
}

router.get("/", async (req, res) => {
  try {
    populateData();
  } catch (err) {
    res.json("Failed to populate data.");
  }
  res.json("Data populated successfully.");
});

module.exports = router;
