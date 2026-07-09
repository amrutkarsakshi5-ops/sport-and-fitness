const admin = require('../config/firebase');
const { User } = require('../models');

const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        // Find user in local DB to attach role
        let user = await User.findByPk(decodedToken.uid);
        if (!user) {
            // Optional: Auto-create user if they don't exist yet, but for now we expect them to hit /auth/signup
            req.user = { uid: decodedToken.uid, email: decodedToken.email };
        } else {
            req.user = { uid: decodedToken.uid, email: user.email, role: user.role };
        }
        
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        return res.status(401).json({ error: 'Unauthorized: Token verification failed' });
    }
};

const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};

module.exports = { requireAuth, requireRole };
