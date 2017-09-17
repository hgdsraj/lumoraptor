<template>
  <div class="home">
    <label class="label is-large">Sign Up!</label>
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
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button is-info" aria-haspopup="true" aria-controls="dropdown-menu4">
              <span>Choose a Health Status</span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
              <input type="radio" id="ocd" value="OCD" v-model="health_status">
              <label class="label" for="ocd">OCD</label>
              <input type="radio" id="anxiety" value="Anxiety" v-model="health_status">
              <label class="label" for="anxiety">Anxiety</label>
              <input type="radio" id="depression" value="Depression" v-model="health_status">
              <label class="label" for="depression">Depression</label>
              <input type="radio" id="insomnia" value="Insomnia" v-model="health_status">
              <label class="label" for="insomnia">Insomnia</label>
            </div>
          </div>
        </div>
        <br>
        <br>
        <button id="btnSignUp" v-on:click="SignUp()" class="button">
          Submit
        </button>
        <button v-on:click="googleLogin()" class="button">
          Sign up with Google
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
        },
        health_status: ''
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
