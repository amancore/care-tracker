const { Router } = require('express');
const multer = require('../middlewares/upload.middleware.js');
const { requireAuth } = require('../middlewares/auth.middleware.js');
const { preAnalyze } = require('../controllers/preanalysis.controller.js');

const router = Router();
router.post(
    '/',
    requireAuth(['patient','doctor']),
    multer.single('image'),
    preAnalyze
);

module.exports = router;
