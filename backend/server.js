const app = require('./src/app');
const { syncDatabase } = require('./src/models');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await syncDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
