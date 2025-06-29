const { Router } = require('express');
const { requireAuth } = require('../middlewares/auth.middleware.js');
const {
    listReports,
    updateReport,
    deleteReport
} = require('../controllers/history.controller.js');

const router = Router();
router.get('/',    requireAuth(), listReports);
router.put('/:id', requireAuth(), updateReport);
router.delete('/:id', requireAuth(), deleteReport);

module.exports = router;
