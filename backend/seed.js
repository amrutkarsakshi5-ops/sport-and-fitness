const { sequelize, User, Category, VendorProfile, Service } = require('./src/models');

const seedDatabase = async () => {
    try {
        console.log('Synchronizing database...');
        await sequelize.sync({ force: true }); // Warning: This drops existing tables!
        
        console.log('Seeding categories...');
        await Category.bulkCreate([
            { name: 'Gym', image_url: 'gym.png' },
            { name: 'Yoga', image_url: 'yoga.png' },
            { name: 'Swimming', image_url: 'swimming.png' },
            { name: 'Martial Arts', image_url: 'martial_arts.png' }
        ]);

        console.log('Seeding users...');
        const user1 = await User.create({ id: 'firebase_uid_1', email: 'user@example.com', role: 'user' });
        const vendor1 = await User.create({ id: 'firebase_uid_2', email: 'vendor@example.com', role: 'vendor' });
        const admin1 = await User.create({ id: 'firebase_uid_3', email: 'admin@example.com', role: 'admin' });

        console.log('Seeding vendor profiles...');
        const profile1 = await VendorProfile.create({
            user_id: vendor1.id,
            business_name: 'Elite Fitness Center',
            description: 'A premium gym for all your fitness needs.',
            status: 'approved' // Approve it for testing public endpoints
        });

        console.log('Seeding services...');
        await Service.bulkCreate([
            { vendor_profile_id: profile1.id, name: '1 Month Membership', price: 50.00, description: 'Access to all gym equipment' },
            { vendor_profile_id: profile1.id, name: 'Personal Training', price: 30.00, description: '1 hour session with a trainer' }
        ]);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
