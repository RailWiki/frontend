<template>
  <div class="loading-indicator d-flex justify-content-center my-2" v-if="showLoadingIndicator">
    <b-spinner variant="secondary " label="Loading..." class="spinner" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapGetters([
      'showLoadingIndicator',
    ]),
  },
});
</script>

<style>
.loading-indicator .spinner {
  width: 3rem;
  height: 3rem;
}
</style>
