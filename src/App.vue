<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app{
  padding: 30px;
  max-width: 1170px;
  margin: 0 auto;
}

</style>
