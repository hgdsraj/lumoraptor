<!-- Vue component for chat input field -->
<template>
  <div class="chatinputfield">
    <div class="field">
      <textarea class="textarea" placeholder="Type your message here!"></textarea>
      <a class="button is-info">Send message</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chatinputfield',
    data: {
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/variables';
  .field {
    position: fixed;
    min-width: 98%;
    max-width: 98%;
    bottom: 0;
  }
  .field .button {
    position: relative;
    float: right;
    margin-bottom: 5px;
  }
  .textarea {
    margin: 10px;
    padding: 5px;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    background-color: turquoise;
    resize: none;
  }
</style>
