import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User as FirebaseUser } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinDate: string;
  stats: {
    coursesCompleted: number;
    eventsAttended: number;
    projectsSubmitted: number;
    certificatesEarned: number;
  };
  preferences?: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
}

export const createUserProfile = async (firebaseUser: FirebaseUser, additionalData?: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userProfile: UserProfile = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || additionalData?.name || 'User',
      email: firebaseUser.email || '',
      avatar: firebaseUser.photoURL || '/assets/default-avatar.jpg',
      role: additionalData?.role || 'Member',
      joinDate: new Date().toISOString().split('T')[0],
      stats: {
        coursesCompleted: 0,
        eventsAttended: 0,
        projectsSubmitted: 0,
        certificatesEarned: 0
      },
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      },
      ...additionalData
    };

    await setDoc(userRef, userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const updateUserStats = async (uid: string, statType: keyof UserProfile['stats'], increment: number = 1) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const currentStats = userSnap.data().stats;
      const updatedStats = {
        ...currentStats,
        [statType]: currentStats[statType] + increment
      };
      
      await updateDoc(userRef, { stats: updatedStats });
    }
  } catch (error) {
    console.error('Error updating user stats:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<UserProfile | null> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}; 