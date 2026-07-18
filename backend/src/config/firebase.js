const admin = require('firebase-admin');

// Ensure you have FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env
// For local testing, you might use a service account key file directly.
try {
  if (admin && admin.credential && typeof admin.credential.applicationDefault === 'function') {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  } else {
    // Fallback to default initialization (use ADC or environment configuration)
    admin.initializeApp();
  }
} catch (err) {
  console.error('Firebase initialization error:', err);
  // Don't crash the whole server if Firebase cannot initialize here;
  // downstream code should handle missing admin features.
}

module.exports = admin;
