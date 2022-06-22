//Imports
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

import {
  getFireStore,
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

}