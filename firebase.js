// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBYVpbNnYKdzy4Q5iNYatA-RQB9gRl4paA",
    authDomain: "lost-and-found-cell.firebaseapp.com",
    projectId: "lost-and-found-cell",
    storageBucket: "lost-and-found-cell.firebasestorage.app",
    messagingSenderId: "770752256811",
    appId: "1:770752256811:web:254b565e9f52a84901436e",
    measurementId: "G-3WH6Q1V1LT"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const authReady = signInAnonymously(auth);

export {
    app,
    db,
    auth,
    authReady,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy
};
