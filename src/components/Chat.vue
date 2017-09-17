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
    <div v-for="msg in msgs" :key="msg['.key']" >
      <div v-if="!reportedUsers[msg.user.uid]" style="padding-bottom: 50px">
      <div class="card">
        <header>
          <p class="is-pulled-left">
            {{ msg.user.firstName }}
          </p>
          <p class="is-pulled-right">{{formattedDate(new Date(-1 * msg.date))}}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p> {{ msg.text }} </p>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" v-on:click="reportUser(msg.user.uid)">Report</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a class="card-footer-item" v-on:click="removeMessage(msg['.key'])">Delete</a>
        </footer>
      </div>
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
          email: '',
          firstName: ''
        },
        text: '',
        value: '',
        health_status: healthStatus,
        reportedUsers: {}
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
      },
      removeMessage: function (message) {
        db.ref(healthStatus).child(message).remove()
      },
      reportUser: function (uid) {
        db.ref('reported_users').child(uid).set(true)
      }
    },
    beforeCreate: function () {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.user = user
          this.newMsg.user.uid = user.uid
          db.ref('user_settings/' + user.uid).orderByValue().on('value', function (snapshot) {
            this.newMsg.user.firstName = snapshot.val().first_name
            console.log('Mein Name ist: ', snapshot.val().first_name)
          }.bind(this)).bind(this)
          this.reportedUsers = db.ref('reported_users').on('value', function (snapshot) {
            console.log(snapshot.val())
            this.reportedUsers = snapshot.val()
          }.bind(this)).bind(this)
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
    border-style: groove;
  }

  .content {
    font-size: 30px;
  }

  .title {
    font-size: 100px;
  }
</style>
