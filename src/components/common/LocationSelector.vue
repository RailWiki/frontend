<template>
  <div class="location-selector">
    <multiselect
      id="locationSelect"
      :value="value"
      :options="locations"
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
import { mapGetters, mapActions } from 'vuex';
import { debounce } from 'lodash';
import { FilterLocationsModel } from '@/models/geography/Location';

export default {
  name: 'LocationSelector',
  props: {
    value: Object
  },
  data() {
    return {
      selectedId: null
    };
  },
  computed: {
    ...mapGetters('locations', [
      'locations'
    ])
  },
  mounted() {
    this.selectedId = this.value;
  },
  methods: {
    ...mapActions('locations', [
      'search'
    ]),
    searchChanged: debounce(async function(query) {
      const filter = new FilterLocationsModel();
      filter.name = query;

      await this.search(filter);
    }, 500),
    locationSelected(location) {
      this.$emit('change', location);
    }
  }
};
</script>
