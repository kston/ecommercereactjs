import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  const config = {
    apiKey: "AIzaSyAuO5Ps2iq-jT2AKLg1QuUkNj4ogePti5s",
    authDomain: "ecommercereactjs-13543.firebaseapp.com",
    databaseURL: "https://ecommercereactjs-13543.firebaseio.com",
    projectId: "ecommercereactjs-13543",
    storageBucket: "ecommercereactjs-13543.appspot.com",
    messagingSenderId: "414685452932",
    appId: "1:414685452932:web:e257362f5c0c4e837580d1"
  };
  
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

