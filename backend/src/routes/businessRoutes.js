const express = require('express');
const router = express.Router();
const { getBusinesses, getBusinessById } = require('../controllers/businessController');

router.get('/', getBusinesses);
router.get('/:id', getBusinessById);

module.exports = router;
