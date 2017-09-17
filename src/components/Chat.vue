<template>
  <div id="chat" class="chat container">
    <h2 class="title">
      {{newMsg.health_status.charAt(0).toUpperCase() + newMsg.health_status.slice(1)}}
    </h2>
    <form id="form" v-on:submit.prevent="addMsg">
      <br> <br>
      <textarea class="textarea" placeholder="Message" id="chat-message"></textarea>
      <br>
      <div class="container chat-buttons">
      <input id="submit-message" class="button is-primary" type="submit" value="Enter Message">
      <router-link to="/chat" class="button is-primary">Back</router-link>
      </div>
    </form>
    <hr>
    <div v-for="msg in msgs" :key="msg['.key']" style="padding-bottom: 50px">
      <div class="card">
        <header class="card-header">
          <p>
            {{ msg.user.email }}
          </p>
          <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            <p> {{ msg.text }}</p>
            <br>
            <p class="is-pulled-right">{{formattedDate(new Date(-1 * msg.date))}}</p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'
  import {db, firebaseApp} from '../FirebaseSettings'
  const healthStatus = String(location.href.substr(location.href.lastIndexOf('/') + 1))
  export default {
    data: () => ({
      newMsg: {
        user: {
          uid: '',
          email: ''
        },
        text: '',
        value: '',
        health_status: healthStatus
      }
    }),

    firebase: {
      msgs: db.ref(healthStatus).orderByChild('date')
    },

    computed: {
      validation: function () {
        return {
          text: !!this.newMsg.text.trim()
        }
      },
      isValid: function () {
        let validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      },
      change: function () {
        this.$options.firebase.call(this)
      }.bind(this)
    },
    methods: {
      addMsg: function () {
        this.newMsg.text = $('#chat-message').val()
        if (this.isValid) {
          this.newMsg.date = -1 * Date.now()
          db.ref(healthStatus).push(this.newMsg)
          this.newMsg.text = ''
        } else {
          alert('Error, please login')
        }
      },
      changeHealth: function () {
        location.href = '#/chat/' + this.newMsg.health_status
        window.location.reload(false)
      },
      formattedDate: function (date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
    },
    beforeCreate: function () {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.newMsg.user.uid = user.uid
          this.newMsg.user.email = user.email
          console.log('wow it changed dude!')
        } else {
          location.href = '/#/login'
        }
      }.bind(this))
    }

  }

</script>
<style>
  .chat-buttons {
    margin-bottom: 70px;
  }

  .textarea {
    min-width: 0% !important;
    width: 75%;
    resize: none;
    margin-left: auto;
    margin-right: auto;
  }

  .card {
    width: 75%;
    min-width:0% !important;
    margin-left: auto;
    margin-right: auto;

  }
</style>
