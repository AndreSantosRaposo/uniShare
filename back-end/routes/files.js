const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticationMiddleware = require('../middleware/authentication');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { uploadFile, getFile, getAllFilesInfo } = require('../controllers/files');

router.post('/upload', authenticationMiddleware, upload.single('file'), uploadFile);
router.get('/view/:id', getFile);
router.get('/view',getAllFilesInfo);

module.exports = router;
