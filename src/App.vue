<template>
  <div id="app">
    <main-nav v-if="!hideNavBar" />

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
import { Component, Vue, Watch } from 'vue-property-decorator';
import MainNav from '@/components/MainNav.vue';

@Component({
  components: {
    MainNav
  }
})
export default class App extends Vue {
  hideNavBar: Boolean = false;

  async created() {
    await this.configureApp();
  };

  @Watch('$route', { immediate: true })
  async configureApp() {
    this.hideNavBar = this.$route?.meta?.hideNavBar ?? false;

    if (await this.$auth.isAuthenticated()) {
      await this.$store.dispatch('setCurrentUser');
    }
  };
}
</script>

<style lang="scss">
</style>
