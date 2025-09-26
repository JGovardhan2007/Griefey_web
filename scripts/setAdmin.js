import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const setEmailAsAdmin = async (email) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    await db.collection('users').doc(uid).set({
      isAdmin: true
    }, { merge: true });

    console.log(`Successfully made ${email} an admin.`);
    process.exit(0);
  } catch (error) {
    console.error('Error setting admin:', error);
    process.exit(1);
  }
};

const email = process.argv[2];

if (!email) {
  console.log('Please provide an email address.');
  process.exit(1);
} else {
  setEmailAsAdmin(email);
}
