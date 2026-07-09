const { VendorProfile, Service } = require('../models');

// GET /businesses
const getBusinesses = async (req, res, next) => {
    try {
        // Only return approved vendors
        const businesses = await VendorProfile.findAll({
            where: { status: 'approved' },
            include: [{ model: Service, as: 'services' }]
        });
        res.json(businesses);
    } catch (error) {
        next(error);
    }
};

// GET /businesses/:id
const getBusinessById = async (req, res, next) => {
    try {
        const business = await VendorProfile.findOne({
            where: { id: req.params.id, status: 'approved' },
            include: [{ model: Service, as: 'services' }]
        });

        if (!business) {
            return res.status(404).json({ error: 'Business not found or not approved' });
        }

        res.json(business);
    } catch (error) {
        next(error);
    }
};

module.exports = { getBusinesses, getBusinessById };
