<template>
  <div class="container">
    <label class="label is-large">Welcome to Lumoraptor, thanks for signing in!</label>
    <label class="label is-large">Click on the chat button in the upper left to get started!</label>
  </div>
</template>

<script>
  import {firebaseApp} from '../FirebaseSettings'
  // import {auth} from 'firebase'

  export default {

    template: '#hello',
    name: 'hello',
    data: () => ({
      userId: {},
      messages: []
    }),
    beforeCreate: function () {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.userId = user.uid
        } else {
          location.href = '/#/login'
        }
      }.bind(this))
    }
    // Initialize reactive props, bind later when user is available

  }
</script>
