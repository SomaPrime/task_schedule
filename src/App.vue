<template>
  <div id="app">
    <HeaderMenu></HeaderMenu>
    <div class="contains">
      <router-view/>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import HeaderMenu from '@/components/HeaderMenu.vue'

export default {
  name: 'app',
  components: {
    HeaderMenu
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
.contains {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>