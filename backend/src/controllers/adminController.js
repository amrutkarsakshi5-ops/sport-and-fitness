const { VendorProfile, User } = require('../models');

// GET /admin/vendors/pending
const getPendingVendors = async (req, res, next) => {
    try {
        const pendingVendors = await VendorProfile.findAll({
            where: { status: 'pending' },
            include: [{ model: User, as: 'user', attributes: ['email', 'role'] }]
        });
        res.json(pendingVendors);
    } catch (error) {
        next(error);
    }
};

// PUT /admin/vendors/:id/approve
const approveVendor = async (req, res, next) => {
    try {
        const vendor = await VendorProfile.findByPk(req.params.id);
        if (!vendor) return res.status(404).json({ error: 'Vendor profile not found' });

        vendor.status = 'approved';
        await vendor.save();
        
        res.json({ message: 'Vendor approved', vendor });
    } catch (error) {
        next(error);
    }
};

// PUT /admin/vendors/:id/reject
const rejectVendor = async (req, res, next) => {
    try {
        const vendor = await VendorProfile.findByPk(req.params.id);
        if (!vendor) return res.status(404).json({ error: 'Vendor profile not found' });

        vendor.status = 'rejected';
        await vendor.save();
        
        res.json({ message: 'Vendor rejected', vendor });
    } catch (error) {
        next(error);
    }
};

module.exports = { getPendingVendors, approveVendor, rejectVendor };
