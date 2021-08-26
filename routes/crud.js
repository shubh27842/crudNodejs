const express = require('express');
const crudController = require('../controller/crudController')
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
    destination: "assets/uploads/",
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.get("/getData",crudController.getData);
router.post("/createData",upload.single('img'),crudController.createData);
router.post("/updateData",crudController.updateData);
router.delete("/deleteData",crudController.deleteData);

module.exports = router;