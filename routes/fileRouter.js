const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/import', fileController.importExcel);
router.get('/export', fileController.exportExcel);

module.exports = router;
