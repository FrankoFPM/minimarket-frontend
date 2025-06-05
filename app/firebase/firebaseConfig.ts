// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
//import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCCgZu6wlppc89DaXbbHxLAR0QAEfyUi-A',
  authDomain: 'markerapp-60472.firebaseapp.com',
  projectId: 'markerapp-60472',
  storageBucket: 'markerapp-60472.firebasestorage.app',
  messagingSenderId: '274186118858',
  appId: '1:274186118858:web:a0e6891b9d267ef7b93633',
  measurementId: 'G-QKBYTY4J6M'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)
export const auth = getAuth(app)
