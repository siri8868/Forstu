const express = require('express');

const uploadController = require('../controllers/uploadController');


const router = express.Router();

router.post("/upload", uploadController.uploadFile);


module.exports = router;

