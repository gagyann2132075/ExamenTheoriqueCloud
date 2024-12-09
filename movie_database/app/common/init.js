import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getMessaging } from "firebase/messaging"

export default function() {
  //TODO: 
  //  1. Installer Firebase: npm install firebase
  //  2. Créer un projet Firebase (dans l'interface Web)
  //  3. Enregistrer une application (dans l'interface Web)
  //  4. Obtenir la configuration à partir de l'application (à partir de l'interface Web):
  const firebaseConfig = {
    apiKey: "AIzaSyBKpcpCp3HxDtNMBS50V1CCIHHrJls-AwM",
    authDomain: "examencloud-2527d.firebaseapp.com",
    projectId: "examencloud-2527d",
    storageBucket: "examencloud-2527d.firebasestorage.app",
    messagingSenderId: "536867575688",
    appId: "1:536867575688:web:f152810da0a97096fe8c3d"
  };
  
  
  const app = initializeApp(firebaseConfig)
  const auth = getAuth()
  const db = getFirestore(app)
  const messaging = getMessaging(app)
  

  return {db, auth, messaging}
}