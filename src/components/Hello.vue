<template>
  <div class="hello">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            LumoRaptor
          </a>
          <a class="nav-item is-tab is-hidden-mobile is-active">Home</a>
          <a class="nav-item is-tab is-hidden-mobile">Features</a>
          <a class="nav-item is-tab is-hidden-mobile">Pricing</a>
          <a class="nav-item is-tab is-hidden-mobile">About</a>
        </div>
        <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab is-hidden-tablet is-active">Home</a>
          <a class="nav-item is-tab is-hidden-tablet">Features</a>
          <a class="nav-item is-tab is-hidden-tablet">Pricing</a>
          <a class="nav-item is-tab is-hidden-tablet">About</a>
          <a class="nav-item is-tab">
            <figure class="image is-16x16" style="margin-right: 8px">
              <img src="http://bulma.io/images/jgthms.png">
            </figure>
            Profile
          </a>
          <a class="nav-item is-tab">Log out</a>
        </div>
      </div>
    </nav>

    <div>
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--4-col"></div>
        <div class="mdl-cell mdl-cell--4-col">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="email" id="txtEmail" v-model="authInput.txtEmail">
            <label class="mdl-textfield__label" for="txtEmail">Email</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="Password" id="txtPassword" v-model="authInput.txtPassword">
            <label class="mdl-textfield__label" for="txtPassword">Password</label>
          </div>
          <button id="btnLogin" v-on:click="Login()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary">
            Log in
          </button>
          <button id="btnSignUp" v-on:click="SignUp()"  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Sign Up
          </button>
          <button id="btnLogout" v-on:click="LogOut()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button" style="display:none">
            Log out
          </button>
          <button v-on:click="googleLogin()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button">
            Google in
          </button>
        </div>
        <div class="mdl-cell mdl-cell--4-col"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tooltip from 'vue-bulma-tooltip'
  import { mapGetters, mapActions } from 'vuex'
  import Firebase from 'firebase'
  const config = {
    // Initialize Firebase
    apiKey: 'AIzaSyCWbYHHJa1lCWYlJXLYl28Lu2ayGdWIfkc',
    authDomain: 'lumoraptor.firebaseapp.com',
    databaseURL: 'https://lumoraptor.firebaseio.com',
    projectId: 'lumoraptor',
    storageBucket: 'lumoraptor.appspot.com',
    messagingSenderId: '339515833158'
  }

  Firebase.initializeApp(config)
  var provider = new Firebase.auth.GoogleAuthProvider()
  export default {

    data () {
      return {
        authInput: {
          txtEmail: '',
          txtPassword: ''
        }
      }
    },
    name: 'hello',
    components: {
      Tooltip
    },
    props: {
      show: Boolean
    },
    computed: mapGetters({
      pkginfo: 'pkg',
      sidebar: 'sidebar'
    }),
    methods: {
      ...mapActions([
        'toggleSidebar'
      ]),
      Login: function (event) {
        const email = this.authInput.txtEmail
        const pass = this.authInput.txtPassword
        const auth = Firebase.auth()
        const promise = auth.signInWithEmailAndPassword(email, pass)
        this.authInput.txtEmail = ''
        this.authInput.txtPassword = ''
        promise.catch(event => console.log(event.message))
      },
      SignUp: function (event) {
        const email = this.authInput.txtEmail
        const pass = this.authInput.txtPassword
        const auth = Firebase.auth()
        const promise = auth.createUserWithEmailAndPassword(email, pass)
        this.authInput.txtEmail = ''
        this.authInput.txtPassword = ''
        promise.catch(event => console.log(event.message))
      },
      googleLogin: function () {
        Firebase.auth().signInWithPopup(provider).then(function (result) {
          console.log(result)
        }).catch(function (error) {
          console.log(error)
        })
      },
      LogOut: function () {
        Firebase.auth().signOut()
      }
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
        document.getElementById('btnLogout').style.display = ''
      } else {
        document.getElementById('btnLogout').style.display = 'none'
      }
    } else {
      console.log('not loggend in')
      document.getElementById('btnLogout').style.display = 'none'
    }
  })
</script>
<style lang="scss">
  @import '~bulma/sass/utilities/variables';
  .app-navbar {
    position: fixed;
    min-width: 100%;
    z-index: 1024;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    .container {
      margin: auto 10px;
    }
    .nav-right {
      align-items: stretch;
      align-items: stretch;
      flex: 1;
      justify-content: flex-end;
      overflow: hidden;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
  .hero-brand {
    .vue {
      margin-left: 10px;
      color: #36AC70;
    }
    .admin {
      color: #28374B;
    }
  }
</style>
