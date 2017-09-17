<template>
  <div>
    <nav class="navbar is-light has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link to="/" class="nav-item is-tab">LumoRaptor</router-link>
          <router-link to="/chat" class="nav-item is-tab" v-if="user">Chat</router-link>
          <img src="../assets/raptor.png" class="raptor">
        </div>
        <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab" v-if="user">
            Profile
          </a>
          <a class="nav-item is-tab" v-if="user" v-on:click="LogOut()">Log out</a>
          <router-link to="/login" class="nav-item is-tab" v-if="!user">Login</router-link>
          <router-link to="/signup" class="nav-item is-tab" v-if="!user">Sign Up</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import Tooltip from 'vue-bulma-tooltip'
  import { mapGetters, mapActions } from 'vuex'
  import FirebaseActions from '../FirebaseActions'
  import {firebaseApp} from '../FirebaseSettings'
  export default {
    name: 'navbar',
    components: {
      Tooltip
    },
    data: () => ({
      user: null
    }),
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
      ...FirebaseActions
    },
    beforeCreate: function () {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.user = user
        } else {
          this.user = null
        }
        this.$forceUpdate()
      }.bind(this))
    }
  }
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
      flex: 1;
      justify-content: flex-end;
      overflow: hidden;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
  .raptor {
    padding: 4px;
  }
</style>
