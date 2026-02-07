import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDp20DAHIv94FsM-Ogrvf-arl93nbp-nqg',
  authDomain: 'music-950c9.firebaseapp.com',
  projectId: 'music-950c9',
  storageBucket: 'music-950c9.firebasestorage.app',
  messagingSenderId: '755928603428',
  appId: '1:755928603428:web:c0ac85dccf9b700be3b1b1',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export { auth, db, usersCollection };