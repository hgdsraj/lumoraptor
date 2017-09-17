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
        <div class="select">
          <label class="label">Select your health status</label>
          <select v-model="health_status" >
            <option disabled value="">
              Please Select Your Health Status
            </option>
            <option value="anxiety">
              Anxiety
            </option>
            <option value="ocd">
              Obsessive Compulsive Disorder
            </option>
            <option value="insomnia">
              Insomnia
            </option>
            <option value="depression">
              Depression
            </option>
          </select>
        </div>
        <br>
        <br>
        <button id="btnSignUp" v-on:click="SignUp()" class="button">
          Submit
        </button>
        <button v-on:click="googleLogin()" class="button">
          Sign up with Google
        </button>
        <p>{{ health_status }}</p>
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
