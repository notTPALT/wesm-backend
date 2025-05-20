var express = require('express');
var router = express.Router();

var waterModel = require('../config/models/waterModel');
var electricModel = require('../config/models/electricModel');

function getModel(nodeID) {
    if (nodeID == "node_1") return waterModel;
    if (nodeID == "node_2") return electricModel;
    return null;
}

// Route POST: ESP32 gửi dữ liệu
router.post('/', async (req, res) => {
    const data = req.body;
    console.log('📨 Payload nhận được:', req.body);

    if (!data["sensor_id"]) {
        return res.status(400).send("'sensor_id' missing.");
    }

    try {  
        const model = getModel(node_id);
        if (model === null) {
            res.status(500).send("Wrong 'node_id'.");
            return;
        }

        console.log(model);

        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 7); // GMT+7 (Indochina Time)
        
        try {
            var saveModel = new model({ ...data, timestamp: currentTime });
        } catch(err) {
            console.error(`Error: Data structure mismatch between sensor and designated schema.\nMessage: ${err}`);
            res.status(500).send(`Error: Data structure mismatch between sensor and designated schema.\nMessage: ${err}`);
        }
        
        await saveModel.save();
        console.log(`📥 Dữ liệu từ ${sensor_id}:`, data);
        res.status(200).send('Đã lưu thành công');
    } catch (err) {
        console.error('❌ Lỗi ghi dữ liệu:', err);
        res.status(500).send('Lỗi server');
    }
});

module.exports = router;

