<template>
    <div id="app">
        <wb-header></wb-header>
        <router-view></router-view>
        <wb-footer></wb-footer>
    </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'app',
    components: {
      wbHeader: Header,
      wbFooter: Footer
    }
  }
</script>

<style>
</style>
