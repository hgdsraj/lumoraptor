<template>
  <div id="hello" class="hello">
    Hello, World!
    {{ userId }}
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
