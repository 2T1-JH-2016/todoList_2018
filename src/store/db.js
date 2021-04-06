import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyCzTCd8YGgcg02IG1GVg3Uimn325w31nVM",
    authDomain: "osp18-moda2.firebaseapp.com",
    databaseURL: "https://osp18-moda2.firebaseio.com",
    projectId: "osp18-moda2",
    storageBucket: "osp18-moda2.appspot.com",
    messagingSenderId: "756813462119"
};
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});
const dbRef = db.collection('user');
const authRef = firebase.auth();
authRef.setPersistence(firebase.auth.Auth.Persistence.SESSION);


const gProvider = new firebase.auth.GoogleAuthProvider();
const tProvider = new firebase.auth.TwitterAuthProvider();
export {authRef, dbRef, gProvider, tProvider};

