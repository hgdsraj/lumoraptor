import Firebase from 'firebase'
import {db} from './FirebaseSettings'
let provider = new Firebase.auth.GoogleAuthProvider()
export default {
  Login: function (event) {
    const email = this.authInput.txtEmail
    const pass = this.authInput.txtPassword
    Firebase.auth().signInWithEmailAndPassword(email, pass).then(function (result) {
      console.log(result)
    }).catch(function (error) {
      alert(error)
    })
    this.authInput.txtEmail = ''
    this.authInput.txtPassword = ''
  },
  SignUp: function (event) {
    const email = this.authInput.txtEmail
    const pass = this.authInput.txtPassword
    // const healthStatus = this.healthStatus
    const tempSettings = this.userSettings
    Firebase.auth().createUserWithEmailAndPassword(email, pass).then(function (result) {
      console.log()
      db.ref('user_settings').child(Firebase.auth().currentUser.uid).set(tempSettings)
      console.log(result)
    }).catch(function (error) {
      alert(error)
    })
    this.authInput.txtEmail = ''
    this.authInput.txtPassword = ''
  },
  googleLogin: function () {
    Firebase.auth().signInWithPopup(provider).then(function (result) {
      console.log(result)
    }).catch(function (error) {
      alert(error)
    })
  },
  LogOut: function () {
    Firebase.auth().signOut()
    location.reload()
  }
}
