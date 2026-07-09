const admin = require('firebase-admin');

// Ensure you have FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env
// For local testing, you might use a service account key file directly.
admin.initializeApp({
  credential: admin.credential.applicationDefault() 
  // alternatively use: admin.credential.cert(require('../../path-to-service-account.json'))
});

module.exports = admin;
