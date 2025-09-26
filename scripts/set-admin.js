
const admin = require('firebase-admin');
const serviceAccount = require('../griefey-164a6-firebase-adminsdk-9x5mo-652399f91a.json'); // Replace with your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const email = process.argv[2];

if (!email) {
  console.error('Please provide an email address as an argument.');
  process.exit(1);
}

const setAdmin = async (email) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    await db.collection('users').doc(uid).set({
      isAdmin: true
    }, { merge: true });

    console.log(`Successfully set admin role for ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error setting admin role:', error.message);
    process.exit(1);
  }
};

setAdmin(email);
