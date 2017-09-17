<template>
  <div id="hello" class="hello">
    Hello, World!
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
