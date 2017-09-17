<template>
  <div class="home">

    <div class="container">
      <div class="box">
        <div class="field">
          <label class="label" for="txtEmail">Email</label>
          <input class="input" type="email" id="txtEmail" v-model="authInput.txtEmail">
        </div>
        <div class="field">
          <label class="label" for="txtPassword">Password</label>
          <input class="input" type="Password" id="txtPassword" v-model="authInput.txtPassword">
        </div>
        <button id="btnLogin" v-on:click="Login()" class="button is-primary">
          Log in
        </button>
        <button id="btnSignUp" v-on:click="SignUp()"  class="button">
          Sign Up
        </button>
        <button id="btnLogout" v-on:click="LogOut()" class="button" style="display:none">
          Log out
        </button>
        <button v-on:click="googleLogin()" class="button">
          Google in
        </button>
        </div>
      </div>
    </div>
</template>

<script>
  import Firebase from 'firebase'
  import FirebaseActions from '../FirebaseActions'
  export default {

    data () {
      return {
        authInput: {
          txtEmail: '',
          txtPassword: ''
        }
      }
    },
    name: 'home',
    methods: {
      ...FirebaseActions
    }
  }
  Firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      firebaseUser.sendEmailVerification().then(function () {
        console.log('send Verification')
      }, function (error) {
        console.log(error)
        console.log('not send Verification')
      })
      if (firebaseUser.emailVerified === true) {
        console.log('login success')
        document.getElementById('btnLogout') ? document.getElementById('btnLogout').style.display = '' : null
      } else {
        document.getElementById('btnLogout') ? document.getElementById('btnLogout').style.display = 'none' : null
      }
    } else {
      console.log('not logged in')
      document.getElementById('btnLogout') ? document.getElementById('btnLogout').style.display = 'none' : null
    }
  })
</script>
