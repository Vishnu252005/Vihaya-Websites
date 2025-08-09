# Firebase Authentication Setup Guide

## Overview
This project has been updated to use Firebase Authentication instead of hardcoded demo credentials. Follow these steps to set up Firebase for your Vihaya platform.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "vihaya-platform")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Enable and configure
   - **Google**: Enable and configure (add your authorized domain)

## Step 3: Set up Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users
5. Click "Done"

## Step 4: Get Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "vihaya-web")
6. Copy the Firebase configuration object

## Step 5: Update Firebase Configuration

1. Open `src/config/firebase.ts`
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 6: Set up Firestore Security Rules

In your Firebase console, go to Firestore Database > Rules and update the rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read public data
    match /{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

## Step 7: Environment Variables (Optional but Recommended)

For better security, create a `.env` file in your project root:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Then update `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Features Implemented

### Authentication Methods
- ✅ Email/Password registration and login
- ✅ Google OAuth sign-in
- ✅ Automatic user profile creation
- ✅ Persistent authentication state
- ✅ Secure logout functionality

### User Management
- ✅ User profiles stored in Firestore
- ✅ User statistics tracking
- ✅ Profile updates
- ✅ User preferences

### Security Features
- ✅ Firebase Auth security
- ✅ Firestore security rules
- ✅ Error handling and validation
- ✅ Loading states and user feedback

## Testing the Setup

1. Start your development server: `npm run dev`
2. Click "Sign in" in the header
3. Try both email/password registration and Google sign-in
4. Verify that user profiles are created in Firestore
5. Test the logout functionality

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your API key is correct in the configuration

2. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to authorized domains in Firebase Console > Authentication > Settings

3. **"Firebase: Error (auth/popup-closed-by-user)"**
   - This is normal when users close the Google sign-in popup

4. **Firestore permission errors**
   - Check your Firestore security rules
   - Ensure users are authenticated before accessing data

### Development Tips

- Use Firebase Emulator Suite for local development
- Monitor authentication events in Firebase Console
- Check Firestore Database for user data
- Use browser dev tools to debug authentication flow

## Next Steps

After setting up Firebase authentication, you can:

1. Add more authentication providers (GitHub, Twitter, etc.)
2. Implement email verification
3. Add password reset functionality
4. Create admin roles and permissions
5. Add user profile management features
6. Implement real-time data synchronization

## Support

If you encounter issues:
1. Check the Firebase Console for error logs
2. Review the browser console for detailed error messages
3. Verify your Firebase configuration
4. Ensure all required Firebase services are enabled 