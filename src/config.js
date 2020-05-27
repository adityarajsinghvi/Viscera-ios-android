import Firebase from 'firebase';

// Test firebase

// var config = {
//   apiKey: "AIzaSyCm9SNuPw2sPqkKi_fEvxws_fDU32nvRrg",
//   authDomain: "fir-testproj-34665.firebaseapp.com",
//   databaseURL: "https://fir-testproj-34665.firebaseio.com",
//   projectId: "fir-testproj-34665",
//   storageBucket: "fir-testproj-34665.appspot.com",
//   messagingSenderId: "277068007472",
//   appId: "1:277068007472:web:bb779d3cf261a6251045f5"
//   };


// Production firebase

const config = {
  apiKey: "AIzaSyDyRF9SPZYYfxV9E55wCS_oGo0m7JuU95Q",
  authDomain: "viscera.firebaseapp.com",
  databaseURL: "https://viscera.firebaseio.com",
  projectId: "firebase-viscera",
  storageBucket: "firebase-viscera.appspot.com",
  messagingSenderId: "717100138716"
};



let app = Firebase.initializeApp(config);
export const db = app.database();