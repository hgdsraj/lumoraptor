import Firebase from 'firebase'
const config = {
  // Initialize Firebase
  apiKey: 'AIzaSyCWbYHHJa1lCWYlJXLYl28Lu2ayGdWIfkc',
  authDomain: 'lumoraptor.firebaseapp.com',
  databaseURL: 'https://lumoraptor.firebaseio.com',
  projectId: 'lumoraptor',
  storageBucket: 'lumoraptor.appspot.com',
  messagingSenderId: '339515833158'
}

export const firebaseApp = Firebase.initializeApp(config)
export const db = firebaseApp.database()
