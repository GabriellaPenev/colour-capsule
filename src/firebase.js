    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyAaJD8yT2De2svVaTuw9tzVJQJ3-TVHbPI",
    authDomain: "color-capsule-fb.firebaseapp.com",
    projectId: "color-capsule-fb",
    storageBucket: "color-capsule-fb.appspot.com",
    messagingSenderId: "654537536330",
    appId: "1:654537536330:web:abbbddbe70ea8f1a9407b3"
    };

    // Initialize Firebase
    const firebase = initializeApp(firebaseConfig);

    export default firebase;