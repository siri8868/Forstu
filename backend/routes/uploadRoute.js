const express = require("express");

const uploadController = require("../controllers/uploadController");
// const executeStoredProcedure = require('./database/storedProcedures');

const router = express.Router();

router.post("/upload", uploadController.uploadFile);
router.get("/runtheprocedure", uploadController.runTheProcedure);
router.get("/createstoreprocedure", uploadController.createStoreProcedure);

module.exports = router;
