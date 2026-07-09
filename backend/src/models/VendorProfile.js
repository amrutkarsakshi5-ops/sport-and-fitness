const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const VendorProfile = sequelize.define('VendorProfile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING, // FK to users table (Firebase UID)
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        unique: true // A vendor cannot create duplicate business profiles
    },
    business_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending' // Vendor status pending by default
    }
}, {
    tableName: 'vendor_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = VendorProfile;
