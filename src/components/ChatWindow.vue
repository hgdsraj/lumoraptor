<!-- Vue component for chat window -->
<template>
  <div class="chatwindow">
    <div class="tile is-ancestor is-12 is-large">
     Ye
    </div>
  </div>
</template>

<script>
  export default {
    name: 'chatwindow'
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/variables';
  .chatwindow {
    .tile {
      margin: 10px;
      padding: 10px;
      box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
      background-color: turquoise;
    }
  }
</style>
