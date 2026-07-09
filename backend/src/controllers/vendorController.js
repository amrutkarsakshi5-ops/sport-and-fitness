const { VendorProfile, Service } = require('../models');

// POST /vendor/profile
const createProfile = async (req, res, next) => {
    try {
        const { business_name, description } = req.body;
        
        const existingProfile = await VendorProfile.findOne({ where: { user_id: req.user.uid } });
        if (existingProfile) {
            return res.status(400).json({ error: 'Vendor profile already exists' });
        }

        const profile = await VendorProfile.create({
            user_id: req.user.uid,
            business_name,
            description,
            status: 'pending'
        });

        res.status(201).json(profile);
    } catch (error) {
        next(error);
    }
};

// GET /vendor/profile
const getProfile = async (req, res, next) => {
    try {
        const profile = await VendorProfile.findOne({
            where: { user_id: req.user.uid },
            include: [{ model: Service, as: 'services' }]
        });
        
        if (!profile) return res.status(404).json({ error: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        next(error);
    }
};

// PUT /vendor/profile
const updateProfile = async (req, res, next) => {
    try {
        const { business_name, description } = req.body;
        const profile = await VendorProfile.findOne({ where: { user_id: req.user.uid } });
        
        if (!profile) return res.status(404).json({ error: 'Profile not found' });
        
        profile.business_name = business_name || profile.business_name;
        profile.description = description !== undefined ? description : profile.description;
        await profile.save();

        res.json(profile);
    } catch (error) {
        next(error);
    }
};

// POST /vendor/services
const addService = async (req, res, next) => {
    try {
        const { name, price, description } = req.body;
        const profile = await VendorProfile.findOne({ where: { user_id: req.user.uid } });
        
        if (!profile) return res.status(404).json({ error: 'Profile not found. Create a profile first.' });

        const service = await Service.create({
            vendor_profile_id: profile.id,
            name,
            price,
            description
        });

        res.status(201).json(service);
    } catch (error) {
        next(error);
    }
};

module.exports = { createProfile, getProfile, updateProfile, addService };
