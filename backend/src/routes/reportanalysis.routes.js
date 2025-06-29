const { Router } = require('express');
const multer = require('../middlewares/upload.middleware.js');
const { requireAuth } = require('../middlewares/auth.middleware.js');
const {
    createAnalysis,
    getAnalysisById
} = require('../controllers/reportanalysis.controller.js');

const router = Router();
router.post(
    '/',
    requireAuth(['patient','doctor']),
    multer.single('image'),
    createAnalysis
);
router.get('/:id', requireAuth(), getAnalysisById);

module.exports = router;
