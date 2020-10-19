<template>
  <div id="locomotive-filters" class="filters">
    <b-form @submit.prevent="submitSearch">
      <!-- <div class="filter-section road-type">
        <b-form-group label-for="roadTypeIdSelect" label="Road Type">
          <multiselect
            id="roadTypeIdSelect"
            v-model="roadType"
            :options="roadTypeOptions"
            label="text"
            track-by="value"
          />
        </b-form-group>
      </div> -->
      <div class="filter-section road">
        <b-form-group label-for="roadIdSelect" label="Road Name">
          <multiselect
            id="roadIdSelect"
            v-model="road"
            :options="roadOptions"
            label="text"
            value="value"
            @search-change="filterRoads"
            :internal-search="false"
          />
        </b-form-group>
      </div>

      <div class="filter-section road-number">
        <b-form-group label-for="roadNumber" label="Road Number">
          <b-input
            id="roadNumber"
            v-model="roadNumber"
          />
        </b-form-group>
      </div>

      <div class="filter-section model-number">
        <b-form-group label-for="modelNumber" label="Model Number">
          <b-input
            id="modelNumber"
            v-model="modelNumber"
          />
        </b-form-group>
      </div>

      <div class="filter-section serial-number">
        <b-form-group label-for="serialNumber" label="Serial Number">
          <b-input
            id="serialNumber"
            v-model="serialNumber"
          />
        </b-form-group>
      </div>

      <!-- <div class="filter-section build-dates">
        <h5>Build Dates</h5>
      </div> -->

      <b-button type="submit" variant="primary">Search</b-button>
    </b-form>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import { FilterRoadsModel } from '@/models/rosters/Road';
import { FilterLocomotivesModel } from '@/models/rosters/Locomotive';

export default {
  data() {
    return {
      roadType: null,
      road: null,
      roadNumber: null,
      modelNumber: null,
      serialNumber: null
    };
  },
  async created() {
    this.loadRoadTypes();
    this.loadRoads();
  },
  computed: {
    ...mapGetters('roads', [
      'roadTypes',
      'roads'
    ]),
    roadTypeOptions() {
      const roadTypes = this.roadtypes;
      return roadTypes.sort((a, b) => {
        return a.displayOrder > b.displayOrder;
      }).map((x) => {
        return { value: x.id, text: x.name };
      });
    },
    roadOptions() {
      return this.roads.data.map((x) => {
        return { value: x.id, text: `${x.name} - ${x.reportingMarks}` };
      });
    }
  },
  methods: {
    ...mapActions('roads', [
      'loadRoadTypes',
      'loadRoads'
    ]),
    ...mapActions('roads', {
      searchRoads: 'search'
    }),
    ...mapActions('locomotives', [
      'search'
    ]),
    filterRoads: _.debounce(async function(query) {
      const filter = new FilterRoadsModel();
      filter.query = query;
      filter.pageSize = 100;
      await this.loadRoads(filter);
    }, 500),
    async submitSearch() {
      const filter = new FilterLocomotivesModel();
      filter.roadId = this.road ? this.road.value : null;
      filter.roadNumber = this.roadNumber;
      filter.modelNumber = this.modelNumber;
      filter.serialNumber = this.serialNumber;

      // TODO: Add search params to querystring and set fields when page loads (ie permalinks)
      // this.$router.push({ query: { ...filter } })

      await this.search(filter);
    }
  }
};
</script>

<style lang="scss">
  .filter-section {
    margin-bottom: 1rem;
  }
</style>
