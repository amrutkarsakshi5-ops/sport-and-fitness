const { Category } = require('../models');

// GET /categories
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

module.exports = { getCategories };
