<template>
  <div class="locomotives" @click="showEditor">
    <b-badge v-for="loco in selectedLocos" :key="loco.id">
      {{ loco.roadNumber }}
    </b-badge>

    <b-modal id="modal-edit-locomotives"
      :title="`Edit Locomotives (${selectedLocos.length})`"
      @shown="editModalShown"
      @ok="locomotivesUpdated"
      @hidden="editModalHidden">

      <b-form-group label="Add a locomotive" label-for="locomotiveSelect"
        description="Search for a locomotive to add to this photo">

        <!-- Don't love the way this is behaving...
              would like to clear the option after selected -->
        <multiselect
          id="locomotiveSelect"
          v-model="selectLocomotive"
          :options="locomotiveOptions"
          label="roadNumber"
          track-by="roadNumber"
          @search-change="filterLocomotives"
          @select="locomotiveSelected"
          :internal-search="false"
        />
      </b-form-group>

      <h6>Selected Locomotives</h6>

      <b-table-simple small hover>
        <b-thead head-variant="light">
          <b-tr>
            <b-th></b-th>
            <b-th>Road Number</b-th>
            <b-th>Model</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="locomotive in locomotives" :key="locomotive.id">
            <b-td>
              <b-button type="button" size="sm" variant="link" @click="removeLocomotive(locomotive)" class="text-danger" style="padding: 0">Remove</b-button>
            </b-td>
            <b-td>
              {{ locomotive.roadNumber }}
            </b-td>
            <b-td>
              {{ locomotive.modelNumber }}
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>

      <b-form-checkbox-group v-model="selectedLocomotiveIds">
        <b-table-simple small hover v-if="query && locomotives && locomotives.data.length > 0">
          <b-thead head-variant="light">
            <b-tr>
              <b-th>Selected</b-th>
              <b-th>Road Number</b-th>
              <b-th>Model</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="locomotive in locomotives.data" :key="locomotive.id">
              <b-td>
                <b-form-checkbox :value="locomotive.id" />
              </b-td>
              <b-td>
                {{ locomotive.roadNumber }}
              </b-td>
              <b-td>
                {{ locomotive.modelNumber }}
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-form-checkbox-group>
    </b-modal>
  </div>
</template>

<script>
import _ from 'lodash';
import { FilterLocomotivesModel } from '@/models/rosters/Locomotive';
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    selectedLocos: {
      type: Array
    }
  },
  data() {
    return {
      query: '',
      selectLocomotive: null,
      locomotives: [],
      selectedLocomotiveIds: []
    }
  },
  computed: {
    ...mapGetters('locomotives', {
      searchLocos: 'locomotives'
    }),
    locomotiveOptions: function () {
      return this.searchLocos.data
    }
  },
  methods: {
    ...mapActions('locomotives', [
      'search',
      'clearFilters'
    ]),

    showEditor () {
      this.$bvModal.show('modal-edit-locomotives');
    },
    editModalShown () {
      console.log('selected locos', this.selectedLocos);

      this.locomotives = this.selectedLocos;
      this.selectedLocomotiveIds = this.selectedLocos.map(x => x.locomotiveId);
    },
    locomotiveSelected (loco, id) {
      console.log('locomotive selected', loco)
      this.locomotives.push(loco);
    },
    removeLocomotive (locomotive) {
      const index = this.locomotives.indexOf(locomotive);
      this.locomotives.splice(index, 1);
    },
    locomotivesUpdated () {
      console.log('updated - selected loco ids', this.selectedLocomotiveIds);
    },
    editModalHidden () {
      // Clear the filters whenever this modal is hidden,
      // because right now, the same filters apply to /locomotives
      this.clearFilters();
    },
    filterLocomotives: _.debounce(async function(query) {
      // TODO: When you search/filter with this, it's setting the filter in state
      // which means that when you go to /locomotives, the filter is still applied
      // and you have to remove it manually... Ideally, we wouldn't store this
      // particular filter in state (and probably some others too...)
      const filter = new FilterLocomotivesModel();
      filter.roadNumber = query;

      await this.search(filter);
    }, 500)
  }
}
</script>

<style lang="scss">
.locomotives {
  padding: 0.375rem 0.75rem;
  background-color: #fff;
  border: 1px solid #ced4da;
  min-height: 36px;
  cursor: pointer;

  .badge {
    margin: 0 0.25rem 0 0;
  }
}
</style>
