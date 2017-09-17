<!-- Vue component for chat window -->
<template>
  <div class="chatwindow">
    <div class="tile is-11">
      <chat-input-field class="chatinputfield"></chat-input-field>
    </div>
  </div>
</template>

<script>
  import ChatInputField from '@/components/ChatInputField'
  export default {
    name: 'chatwindow',
    components: {
      'chat-input-field': ChatInputField
    },
    data: function () {
      return {
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/variables';
</style>
