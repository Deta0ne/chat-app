import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCjXqGlXrxJxh06B2JjZUziWi02TB8Qx-4',
    authDomain: 'chat-react-app-fdea2.firebaseapp.com',
    projectId: 'chat-react-app-fdea2',
    storageBucket: 'chat-react-app-fdea2.appspot.com',
    messagingSenderId: '245229993821',
    appId: '1:245229993821:web:81aef98e8a872a9c4132b4',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
