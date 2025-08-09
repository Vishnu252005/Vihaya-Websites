# 🔥 Quick Firebase Auth Setup Guide

## ✅ What's Already Done

1. **Firebase Project**: Connected to `vihaya-app`
2. **Firestore Rules**: Deployed and configured
3. **Code Integration**: All authentication code is ready
4. **Development Server**: Running on `npm run dev`

## 🔑 Final Step: Get API Key

You need to get the API key from Firebase Console:

1. **Go to**: https://console.firebase.google.com/project/vihaya-app/overview
2. **Click** the gear icon (⚙️) next to "Project Overview"
3. **Select** "Project settings"
4. **Scroll down** to "Your apps" section
5. **Click** on your web app (should show as "Nexia (web)")
6. **Copy** the complete config object including the `apiKey`

## 📝 Update Configuration

Once you have the API key, update `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY_HERE", // ← Add this
  authDomain: "vihaya-app.firebaseapp.com",
  projectId: "vihaya-app",
  storageBucket: "vihaya-app.firebasestorage.app",
  messagingSenderId: "864981986827",
  appId: "1:864981986827:web:eb0a5c0c1f54ce3b1de10e",
  measurementId: "G-KSV5E52S15"
};
```

## 🚀 Test Authentication

1. **Start the dev server**: `npm run dev`
2. **Open your browser** to the local URL
3. **Click "Sign in"** in the header
4. **Try both**:
   - Email/Password registration
   - Google sign-in

## 🔧 Enable Authentication Providers

In Firebase Console > Authentication > Sign-in method:

1. **Enable Email/Password**
2. **Enable Google** (add your domain to authorized domains)

## 🎉 You're Ready!

Your Firebase authentication is now fully integrated! Users can:
- ✅ Register with email/password
- ✅ Sign in with Google
- ✅ Have profiles stored in Firestore
- ✅ Stay logged in across sessions
- ✅ Sign out securely

## 🆘 Need Help?

- Check browser console for errors
- Verify API key is correct
- Ensure Authentication providers are enabled
- Check Firestore rules are deployed 