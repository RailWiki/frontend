<template>
  <div id="locomotive-details">
    <template v-if="isLoading || !locomotive">
      Loading...
    </template>
    <template v-else>
      <h1>{{ locomotive.roadNumber }}</h1>

      <ul class="locomotive-properties list-inline">
        <li class="list-inline-item">
          <b>Model Number</b> {{ locomotive.modelNumber ? locomotive.modelNumber : 'Unknown' }}
        </li>
        <li class="list-inline-item">
          <b>Serial Number</b> {{ locomotive.serialNumber ? locomotive.serialNumber : 'Unknown' }}
        </li>
      </ul>

      <div class="photo-header d-flex justify-content-between">
        <h3>{{ photos.length }} Photos</h3>

        <div class="options">
          <view-mode-selector :viewMode="viewMode" @viewChanged="viewChanged" />
        </div>
      </div>

      <grid-view v-if="viewMode === 'grid'" :photos="photos" :showAuthor="true" :showLocation="true" />
      <list-view v-if="viewMode === 'list'" :photos="photos" :showAuthor="true" :showLocation="true" />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GridView from '@/components/photos/GridView.vue';
import ListView from '@/components/photos/ListView.vue';
import ViewModeSelector from '@/components/photos/ViewModeSelector.vue';

export default {
  components: {
    GridView,
    ListView,
    ViewModeSelector
  },
  data() {
    return {
      viewMode: 'grid'
    };
  },
  computed: {
    ...mapGetters('locomotives', [
      'isLoading',
      'locomotive'
    ]),
    ...mapGetters('locomotivePhotos', [
      'photos'
    ])
  },
  async created() {
    await this.refresh();
  },
  watch: {
    $route: 'refresh'
  },
  methods: {
    ...mapActions('locomotives', [
      'loadLocomotive'
    ]),
    ...mapActions('locomotivePhotos', [
      'loadLocomotivePhotos'
    ]),

    viewChanged(mode) {
      this.viewMode = mode;
    },

    async refresh() {
      const id = parseInt(this.$route.params.id);

      await this.loadLocomotive(id);
      await this.loadLocomotivePhotos(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.locomotive-properties {
  .list-inline-item {
    margin-right: 2rem;
  }
}
</style>
