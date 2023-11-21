import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; 

export const firebaseMixin = { 
  created() {
    const firebaseConfig = {
        apiKey: "AIzaSyCb945-WiEIgNn0fla7t-RwWGSdcl0fLmY",
        authDomain: "figth-club.firebaseapp.com",
        databaseURL: "https://figth-club-default-rtdb.firebaseio.com",
        projectId: "figth-club",
        storageBucket: "figth-club.appspot.com",
        messagingSenderId: "648332694104",
        appId: "1:648332694104:web:3bcdb44463b4051b41f02d",
        measurementId: "G-01FCEJW3W0"
    } 

    firebase.initializeApp(firebaseConfig)
    const db = firebase.database()

    const databaseRef = db.ref(`${this.$route.params.id}`)

    databaseRef.once('value', (snapshot) => {
      this.data = snapshot.val()
    })
  }
}