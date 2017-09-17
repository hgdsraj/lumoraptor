<template>
  <div id="chat" class="chat container">
    <form id="form" v-on:submit.prevent="addMsg">
      <input class="textarea" type="text" v-model="newMsg.from" placeholder="Name">
      <br> <br>
      <textarea class="textarea" v-model="newMsg.text" placeholder="Message"></textarea>
      <br>
      <input class="button is-primary" type="submit" value="Enter Message">
    </form>
    <hr>
    <ul is="transition-group">
      <li v-for="msg in msgs" :key="msg['.key']">
        <span>{{ msg.from }} - {{ msg.text }}</span>
      </li>
    </ul>
  </div>

</template>

<script>
  import {db} from '../FirebaseSettings'
  const msgsRef = db.ref('msgs')

  export default {
    data: () => ({
      newMsg: {
        from: '',
        text: ''
      }
    }),

    firebase: {
      msgs: msgsRef
    },

    computed: {
      validation: function () {
        return {
          from: !!this.newMsg.from.trim(),
          text: !!this.newMsg.text.trim()
        }
      },
      isValid: function () {
        let validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      }
    },

    methods: {
      addMsg: function () {
        if (this.isValid) {
          msgsRef.push(this.newMsg)
          this.newMsg.text = ''
        } else {
          alert('Error, please login')
        }
      }
    }

  }

</script>
