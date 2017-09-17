<template>
  <div class="container">
    <div class="box">
      <label class="label is-large">Current User Settings</label>
      <div class="box">
        <div v-if="user_settings.first_name">First name: {{ user_settings.first_name }} </div>
        <div v-if="user_settings.last_name">Last name: {{ user_settings.last_name }} </div>
        <div v-if="user_settings.health_status">Mental Health Status: {{ user_settings.health_status }} </div>
      </div>

      <div class="box">
        <label class="label is-large">Edit User Settings</label>
        <div class="field">
          <label class="label" for="firstName">First Name</label>
          <input class="input" id="firstName" v-model="user_settings.first_name">
        </div>
        <div class="field">
          <label class="label" for="lastName">Last Name</label>
          <input class="input" id="lastName" v-model="user_settings.last_name">
        </div>
        <div>Mental Health Status:</div>
        <div class="select">
          <select v-model="user_settings.health_status" >
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
        <br>
        <br>
        <div class="button is-primary" v-on:click="changeUserSettings()">Confirm Changes</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {db, firebaseApp} from '../FirebaseSettings'
  export default {
    data: () => ({
      user: null,
      user_settings: {
        health_status: '',
        first_name: '',
        last_name: ''
      }
    }),
    methods: {
      changeUserSettings: function () {
        if (this.isValid && this.isValidMentalHealthStatus) {
          var userRef = db.ref('user_settings/' + this.user.uid)
          userRef.child('first_name').set(this.user_settings.first_name)
          userRef.child('last_name').set(this.user_settings.last_name)
          userRef.child('health_status').set(this.user_settings.health_status)
          console.log('db changes complete!')
        } else {
          alert('Error, please login')
        }
      }
    },
    computed: {
      validation: function () {
        return {
          first_name: !!this.user_settings.first_name.trim(),
          last_name: !!this.user_settings.last_name.trim()
        }
      },
      isValid: function () {
        let validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      },
      isValidMentalHealthStatus: function () {
        return ['ocd', 'insomnia', 'anxiety', 'depression'].indexOf(this.user_settings.health_status) > -1
      }
    },
    beforeCreate: function () {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.user = user
          db.ref('user_settings/' + user.uid).on('value', function (snapshot) {
            this.user_settings.first_name = snapshot.val().first_name
            this.user_settings.last_name = snapshot.val().last_name
            this.user_settings.health_status = snapshot.val().health_status
          }.bind(this)).bind(this)
        } else {
          this.user = null
        }
        this.$forceUpdate()
      }.bind(this))
    }
  }
</script>
