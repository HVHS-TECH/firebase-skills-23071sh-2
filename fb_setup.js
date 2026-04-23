/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
  const firebaseConfig = {
  apiKey: "AIzaSyAxQlva_6hZjVVsaFBvxivSmG3gBwRUgys",
  authDomain: "sonia-hassan-12comp.firebaseapp.com",
  databaseURL: "https://sonia-hassan-12comp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sonia-hassan-12comp",
  storageBucket: "sonia-hassan-12comp.firebasestorage.app",
  messagingSenderId: "831579977355",
  appId: "1:831579977355:web:df454d08b381a650b5868e"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);
