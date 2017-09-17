<template>
  <div id="chat" class="chat container">
    <form id="form" v-on:submit.prevent="addMsg">
      <div class="select">
        <label class="label" for="health_status">Select your health status</label>

        <select v-model="newMsg.health_status" v-on:change="change_health" id="health_status" >
          <option disabled value="">
            Please Select Your Health Status
          </option>
          <option value="anxiety">
            Anxiety
          </option>
          <option value="ocd">
            Obsessive Compulsive Disorder
          </option>
          <option value="insomnia">
            Insomnia
          </option>
          <option value="depression">
            Depression
          </option>
        </select>
      </div>
      <br> <br>
      <textarea class="textarea" v-model="newMsg.text" placeholder="Message" id="chat-message"></textarea>
      <br>
      <input id="submit-message" class="button is-primary" type="submit" value="Enter Message">
    </form>
    <hr>
    <div v-for="msg in msgs" :key="msg['.key']">
      <div class="card" >
        <div class="card-content">
          <p class="title">
            {{ msg.text }}
          </p>
          <p class="subtitle">
            {{ msg.user.email }}
          </p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            {{ msg.date }}
          </p>
          <p class="card-footer-item">
            {{ newMsg.health_status }}
          </p>
        </footer>
      </div>
      <br>
    </div>
  </div>

</template>

<script>
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
      msgs: db.ref(healthStatus)
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
        if (this.isValid) {
          let date = new Date()
          this.newMsg.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
          db.ref(healthStatus).push(this.newMsg)
          this.newMsg.text = ''
        } else {
          alert('Error, please login')
        }
      },
      change_health: function () {
        location.href = '#/chat/' + this.newMsg.health_status
        window.location.reload(false)
      }
    },
    beforeCreate: function () {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.newMsg.user.uid = user.uid
          this.newMsg.user.email = user.email
        } else {
          location.href = '/#/login'
        }
      }.bind(this))
    }

  }

</script>
<style>
  .select {
    margin-bottom: 100px;
  }
</style>
