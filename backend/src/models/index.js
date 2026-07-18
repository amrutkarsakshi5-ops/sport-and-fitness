const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const VendorProfile = require('./VendorProfile');
const Service = require('./Service');

// Define associations
User.hasOne(VendorProfile, { foreignKey: 'user_id', as: 'vendorProfile' });
VendorProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

VendorProfile.hasMany(Service, { foreignKey: 'vendor_profile_id', as: 'services' });
Service.belongsTo(VendorProfile, { foreignKey: 'vendor_profile_id', as: 'vendorProfile' });

// Function to sync database
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database schemas synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database schemas:', error);
    }
};

module.exports = {
    sequelize,
    User,
    Category,
    VendorProfile,
    Service,
    syncDatabase
};
