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

  created() {
    this.loadNav();
  };

  @Watch('$route', { immediate: true })
  loadNav() {
    this.hideNavBar = this.$route?.meta?.hideNavBar ?? false;
  };
}
</script>

<style lang="scss">
</style>
