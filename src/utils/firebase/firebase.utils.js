//Imports
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  doc,
  getDoc,
  setDoc,
  getFirestore
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlEyFGiiPOCJ8CWNNqwAxInvI0NKdPjzg",
  authDomain: "ecommerce-clothing-store-sc.firebaseapp.com",
  projectId: "ecommerce-clothing-store-sc",
  storageBucket: "ecommerce-clothing-store-sc.appspot.com",
  messagingSenderId: "144007411792",
  appId: "1:144007411792:web:e19adbc37219c1a3e8f955"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
  
  if(!userAuth)return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password)return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutAuthUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback, errorCallback, completedCallback) => onAuthStateChanged(
  auth, 
  callback, 
  errorCallback, 
  completedCallback
);


export const getProductData = async()=> {
  return;  
}

/* 
 * {
 *  next: callback
 *  error: errorCallback
 *  complete: completedCallback
 * }
*/