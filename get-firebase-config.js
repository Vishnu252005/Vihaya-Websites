// Script to help get Firebase configuration
// Run this in your browser console on Firebase Console

console.log(`
🔥 FIREBASE CONFIGURATION HELPER 🔥

To get your complete Firebase configuration:

1. Go to: https://console.firebase.google.com/project/vihaya-app/overview
2. Click the gear icon (⚙️) next to "Project Overview"
3. Select "Project settings"
4. Scroll down to "Your apps" section
5. Click on your web app (should show as "Nexia (web)")
6. Copy the config object

Your current config (missing API key):
{
  "projectId": "vihaya-app",
  "appId": "1:864981986827:web:eb0a5c0c1f54ce3b1de10e",
  "databaseURL": "https://vihaya-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  "storageBucket": "vihaya-app.firebasestorage.app",
  "authDomain": "vihaya-app.firebaseapp.com",
  "messagingSenderId": "864981986827",
  "measurementId": "G-KSV5E52S15"
}

You need to add the "apiKey" field from the Firebase Console.

Then update src/config/firebase.ts with the complete config.
`); 