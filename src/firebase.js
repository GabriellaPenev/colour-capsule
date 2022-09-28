// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADp9d7mBrqHzboYqfe7QxDTl_wBDjDg80",
    authDomain: "colorcapsule-d5c34.firebaseapp.com",
    projectId: "colorcapsule-d5c34",
    storageBucket: "colorcapsule-d5c34.appspot.com",
    messagingSenderId: "360893201464",
    appId: "1:360893201464:web:5a473b717f417ce0253acd"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;