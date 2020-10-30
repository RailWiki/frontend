<template>
  <div id="app">
    <main-nav v-if="!hideNavBar" />

    <div class="container body">
      <router-view />
    </div>

    <!-- <loading-indicator /> -->
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue';

export default {
  components: {
    MainNav
  },
  data() {
    return {
      hideNavBar: false
    };
  },
  async created() {
    await this.configureApp()
  },
  watch: {
    $route: 'configureApp'
  },
  methods: {
    async configureApp() {
      this.hideNavBar = this.$route?.meta?.hideNavBar ?? false;
      if (await this.$auth.isAuthenticated()) {
        await this.$store.dispatch('setCurrentUser');
      }
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
#app {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
}
</style>
