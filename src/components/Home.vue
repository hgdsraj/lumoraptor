<template>
  <div class="container">
    <label class="label is-large">Welcome to SupportRaptor, thanks for signing in!</label>
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
    }),
    beforeCreate: function () {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.userId = user.uid
          location.href = '/#/chat'
        } else {
          location.href = '/#/login'
        }
      }.bind(this))
    }
    // Initialize reactive props, bind later when user is available

  }
</script>
