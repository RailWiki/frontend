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
  protected hideNavBar: boolean = false;

  protected async created() {
    await this.configureApp();
  }

  @Watch('$route', { immediate: true })
  protected async configureApp() {
    this.hideNavBar = this.$route?.meta?.hideNavBar ?? false;

    if (await this.$auth.isAuthenticated()) {
      await this.$store.dispatch('setCurrentUser');
    }
  }
}
</script>

<style lang="scss">
</style>
