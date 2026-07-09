const express = require('express');
const router = express.Router();
const { getPendingVendors, approveVendor, rejectVendor } = require('../controllers/adminController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

router.use(requireAuth);
router.use(requireRole(['admin']));

router.get('/vendors/pending', getPendingVendors);
router.put('/vendors/:id/approve', approveVendor);
router.put('/vendors/:id/reject', rejectVendor);

module.exports = router;
