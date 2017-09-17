<template>
  <div id="app">
    <app-navbar></app-navbar>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import {db} from './FirebaseSettings'
  export default {
    name: 'app',
    components: {
      'app-navbar': NavBar
    },
    beforeCreate: function () {
      let listRef = db.ref('presence')
      let userRef = listRef.push()

      let presenceRef = db.ref('.info').child('connected')
      presenceRef.on('value', function (snap) {
        if (snap.val()) {
          // Remove ourselves when we disconnect.
          userRef.onDisconnect().remove()
          userRef.set(true)
        }
      })
      listRef.on('value', function (snap) {
        console.log('# of online users = ' + snap.numChildren())
      })
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .main-content {
    margin-top: 20px;
  }
</style>
