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

const firebaseConfig = {
    apiKey: "AIzaSyC7qhnN7--MS3keWQ8RQ-mElS0UtcCpD_c",
    authDomain: "lost-and-found-cell.firebaseapp.com",
    projectId: "lost-and-found-cell",
    storageBucket: "lost-and-found-cell.firebasestorage.app",
    messagingSenderId: "770752256811",
    appId: "1:770752256811:web:254b565e9f52a84901436e",
    measurementId: "G-3WH6Q1V1LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connect Firestore Database
const db = getFirestore(app);

export { app, db, collection, addDoc, getDocs, query, orderBy };