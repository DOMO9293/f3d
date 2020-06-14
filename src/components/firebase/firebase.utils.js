import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBMsjPBTOO2GUTKyf5SqshyI1ys1W_wHIE",
  authDomain: "racivid.firebaseapp.com",
  databaseURL: "https://racivid.firebaseio.com",
  projectId: "racivid",
  storageBucket: "racivid.appspot.com",
  messagingSenderId: "936287956793",
  appId: "1:936287956793:web:99aeb67cfc561cfead42e8",
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
        ...additionalData,
      });
    } catch (e) {
      console.log("error", e.message);
    }
  }
  return userRef;
};

export const AddNews = async (userAuth, urlsource) => {
  if (!userAuth) return;

  const { publishedAt } = urlsource;

  // console.log("data", url, userAuth);

  const scrapRef = firestore.doc(`users/${userAuth.id}/scrap/${publishedAt}`);
  const snapShot = await scrapRef.get();

  console.log("snapshot", snapShot);
  if (!snapShot.exists) {
    try {
      await scrapRef.set(urlsource);
    } catch (e) {
      console.log("error", e.message);
    }
  }
  return scrapRef;
};

export const GetList = async (userAuth) => {
  if (!userAuth) return;

  const listRef = firestore.collection(`users/${userAuth.id}/scrap`);

  const list = [];

  /*   listRef.get().then((qS) => {
    qS.forEach((doc) => {
      list.push(doc.data());
    });
  }); */

  const snapshot = await listRef.get();

  snapshot.forEach((d) => list.push(d.data()));
  //console.log("coll", snapshot);
  //console.log("snp", list);
  return list;
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//this give us access to this new Google auth provider class from the authentication library
//provier takes a couple custom parameters using the custom parameters method
provider.setCustomParameters({ propmt: "select_account" });
//this means we want to always trigger the Google popup when ever we use this Google auth provider for authentication and sign in

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
