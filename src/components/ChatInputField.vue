<!-- Vue component for chat input field -->
<template>
  <div class="chatinputfield">
    <div class="field">
      <textarea class="textarea" placeholder="Type your message here!"></textarea>
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
  .textarea {
    position: fixed;
    max-width: 95%;
    min-width: 96%;
    bottom: 0;
    margin: 10px;
    padding: 5px;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    background-color: turquoise;
  }
</style>
