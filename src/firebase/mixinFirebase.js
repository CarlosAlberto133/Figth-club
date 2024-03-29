import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; 

export const firebaseMixin = { 
  created() {
    const firebaseConfig = {
        apiKey: process.env.VUE_APP_API_KEY,
        authDomain: process.env.VUE_APP_AUTH_DOMAIN,
        databaseURL: process.env.VUE_APP_DATA_BASE_URL,
        projectId: process.env.VUE_APP_PROJECT_ID,
        storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
        appId: process.env.VUE_APP_APP_ID,
        measurementId: process.env.VUE_APP_MEASUREMENT_ID
    } 

    firebase.initializeApp(firebaseConfig)
    const db = firebase.database()

    const databaseRef = db.ref(`${this.$route.params.id}`)

    databaseRef.once('value', (snapshot) => {
      this.data = snapshot.val()
    })
  }
}