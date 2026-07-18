const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, addService } = require('../controllers/vendorController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

router.use(requireAuth);
router.use(requireRole(['vendor', 'admin']));

router.post('/profile', createProfile);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/services', addService);

module.exports = router;
