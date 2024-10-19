// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyA6H-wY5kFlpxUvTzuVDrGbLzPYKZy1oCs",
  
    authDomain: "post-8e272.firebaseapp.com",
  
    projectId: "post-8e272",
  
    storageBucket: "post-8e272.appspot.com",
  
    messagingSenderId: "174052373619",
  
    appId: "1:174052373619:web:c58fd310fe73632ed6a606",
  
    measurementId: "G-NFPKZ2LD09"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
