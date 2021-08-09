const express = require('express');
const crudController = require('../controller/crudController')
const router = express.Router();

router.get("/getData",crudController.getData);
router.post("/createData",crudController.createData);
router.post("/updateData",crudController.updateData);
router.delete("/deleteData",crudController.deleteData);

module.exports = router;