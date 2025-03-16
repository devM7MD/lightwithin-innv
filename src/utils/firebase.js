
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {

  apiKey: "AIzaSyBZ0dxsSAAgkLVERKJ0MoLHpmZj79aDVCI",

  authDomain: "testa-8d05c.firebaseapp.com",

  projectId: "testa-8d05c",

  storageBucket: "testa-8d05c.firebasestorage.app",

  messagingSenderId: "891447611083",

  appId: "1:891447611083:web:26dbb520f6ec206f88554e",

  measurementId: "G-96GXDBLYYW"

};




const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { db, auth, storage };