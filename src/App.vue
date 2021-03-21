<template>
  <div id="app">
    <main-nav v-if="!hideNavBar" />

    <div class="container body">
      <loading-indicator />
      <router-view />
    </div>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import MainNav from '@/components/MainNav.vue';

export default {
  components: {
    LoadingIndicator,
    MainNav,
  },
  data() {
    return {
      hideNavBar: false,
    };
  },
  async created() {
    await this.configureApp();
  },
  watch: {
    $route: 'configureApp',
  },
  methods: {
    async configureApp() {
      this.hideNavBar = this.$route?.meta?.hideNavBar ?? false;
      if (await this.$auth.isAuthenticated()) {
        await this.$store.dispatch('setCurrentUser');
      }
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
#app {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
}
</style>
