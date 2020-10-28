<template>
  <div class="location-selector">
    <multiselect
      id="locationSelect"
      v-model="selectedId"
      :value="value"
      :options="locationOptions"
      label="name"
      track-by="name"
      :internal-search="false"
      @search-change="searchChanged"
      @input="locationSelected"
      placeholder="Search for a location by name, city or state"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash';
// TODO: Use store
import LocationService from '@/services/locationService';
import { FilterLocationsModel } from '@/models/geography/Location';

export default {
  name: 'LocationSelector',
  props: {
    value: Object
  },
  data() {
    return {
      selectedId: null,
      locationOptions: []
    };
  },
  created() {
    this.selectedId = this.value;
  },
  methods: {
    searchChanged: debounce(async function(query) {
      console.log('query', query);

      const filter = new FilterLocationsModel();
      filter.name = query;

      this.locationOptions = await LocationService.search(filter);
    }, 500),
    locationSelected(location) {
      // console.log('location selected', location);
      this.$emit('change', location);
    }
  }
};
</script>
