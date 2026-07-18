const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const businessRoutes = require('./routes/businessRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/businesses', businessRoutes);
app.use('/vendor', vendorRoutes);
app.use('/admin', adminRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is running' });
});

app.use(errorHandler);

module.exports = app;
