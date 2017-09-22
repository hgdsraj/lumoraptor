<template>
  <div class="home">
    <label class="label is-large">Welcome to SupportRaptor, a chat platform for mental health communities!</label>
    <label class="is-medium">Sign up by filling out the form below:</label>
    <br>
    <br>
    <div class="container">
      <div class="box">
        <div class="field">
          <label class="label" for="firstName">First Name</label>
          <input class="input" id="firstName" v-model="userSettings.first_name">
        </div>
        <div class="field">
          <label class="label" for="lastName">Last Name</label>
          <input class="input" id="lastName" v-model="userSettings.last_name">
        </div>
        <div class="field">
          <label class="label" for="txtEmail">Email</label>
          <input class="input" type="email" id="txtEmail" v-model="authInput.txtEmail">
        </div>

        <div class="field">
          <label class="label" for="txtPassword">Password</label>
          <input class="input" type="Password" id="txtPassword" v-model="authInput.txtPassword">
        </div>
        <div class="container">
          <div class="select">
            <label class="label">Select your health status</label>
            <select v-model="userSettings.health_status" >
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
          <br>
          <button id="btnSignUp" v-on:click="SignUp()" class="button is-primary">
          Submit
          </button>
          <button v-on:click="googleLogin()" class="button is-primary">
            Sign up with Google
          </button>
        </div>
        <br>
        <br>
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
        userSettings: {
          health_status: '',
          first_name: '',
          last_name: ''
        }
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
