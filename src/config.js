import Firebase from 'firebase';



let app = Firebase.initializeApp(config);
export const db = app.database();
