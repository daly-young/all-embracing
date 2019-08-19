<template>
  <div id="app">
    <Search/>
    <Collection/>
  </div>
</template>

<script>
import Search from './components/search.vue'
import Collection from './components/collection.vue'

export default {
  name: 'app',
  components: {
    Search,
    Collection
  }
}
</script>

<style lang="scss">
@import './assets/style/reset.css';

html,body {
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;
  background: url(./assets/images/bg.jpg) no-repeat 0 0 ;
  background-size: cover;
}
</style>
