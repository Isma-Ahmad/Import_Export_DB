
const express = require('express');
const path = require('path');
const { importFromExcel, exportAndGenerateLink, upload } = require('../controllers/fileController');

const router = express.Router();

router.use('/downloads', express.static(path.join(__dirname, '..', 'downloads')));

router.get('/export', exportAndGenerateLink);

router.post('/import', upload.single('file'), importFromExcel);

module.exports = router;
