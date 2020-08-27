<template>
  <div id="app">
    <main-nav />

    <div class="container body">
      <router-view />

      <!-- <b-toast title="BootstrapVue" static visible variant="success">
        Hello, world! This is a toast message.
      </b-toast> -->
    </div>

    <!-- <loading-indicator /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainNav from '@/components/MainNav.vue';

@Component({
  components: {
    MainNav
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
