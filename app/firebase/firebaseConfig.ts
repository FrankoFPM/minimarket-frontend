// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
//import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBDBKBxAZaJGYBdrfAd9ZBeLlAZSWqTjJo',
  authDomain: 'minimarketback.firebaseapp.com',
  projectId: 'minimarketback',
  storageBucket: 'minimarketback.firebasestorage.app',
  messagingSenderId: '634080994170',
  appId: '1:634080994170:web:2682fe6bb733003847acc3',
  measurementId: 'G-QQ3J1RMFCZ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)
export const auth = getAuth(app)
