<template>
  <div>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link to="/" class="nav-item">
            LumoRaptor
          </router-link>
          <a class="nav-item is-tab is-hidden-mobile is-active">Home</a>
          <router-link to="/login" class="nav-item">Login</router-link>
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
          <a class="nav-item is-tab" v-if="user">
            <figure class="image is-16x16" style="margin-right: 8px">
              <img src="http://bulma.io/images/jgthms.png">
            </figure>
            Profile
          </a>
          <a class="nav-item is-tab" v-if="user" v-on:click="LogOut()">Log out</a>
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
      align-items: stretch;
      flex: 1;
      justify-content: flex-end;
      overflow: hidden;
      overflow-x: auto;
      white-space: nowrap;
    }
  }

</style>
