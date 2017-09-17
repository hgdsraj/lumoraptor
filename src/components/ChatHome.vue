<template>
</template>

<script>
  import {firebaseApp, db} from '../FirebaseSettings'
  const healthStatus = String(location.href.substr(location.href.lastIndexOf('/') + 1))
  export default {
    data: () => ({
      health_status: healthStatus
    }),

    methods: {
      change_health: function () {
        location.href = '#/chat/' + this.health_status
        window.location.reload(false)
      }
    },
    beforeCreate: function () {
      firebaseApp.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.user = user
          db.ref('user_settings/' + user.uid).orderByValue().on('value', function (snapshot) {
            location.href = '#/chat/' + snapshot.val().health_status
            window.location.reload(false)
          })
        } else {
          location.href = '#/'
          window.location.reload(false)
          this.user = null
        }
        this.$forceUpdate()
      }.bind(this))
    }

  }

</script>
<style>
  .select {
    margin-bottom: 100px;
  }
</style>
