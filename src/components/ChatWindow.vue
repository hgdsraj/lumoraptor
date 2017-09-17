<!-- Vue component for chat window -->
<template>
  <div class="chatwindow">
    <div class="tile is-11.2">
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
    data: {

    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/variables';
  .chatwindow {
    .tile {
      position: fixed;
      left: 8px;
      width: 100%;
      height: 91%;
      padding: 10px;
      box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
      white-space: nowrap;
      overflow-y: scroll;
    }
  }
</style>
