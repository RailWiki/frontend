<template>
  <div id="edit-locomotive">
    <b-form @submit.prevent="saveLocomotive">
      <b-alert :show="error !== null" variant="danger">
        {{error}}
      </b-alert>

      <b-form-group label="Road" label-for="roadSelector" :label-sr-only="true">
        <multiselect
          id="roadSelector"
          v-model="locomotive.road"
          :options="roads.data"
          label="text"
          track-by="value"
          @search-change="filterRoads"
          :internal-search="false"
          placeholder="Road name">

          <template slot="option" slot-scope="data">{{ `${data.option.name} - ${data.option.reportingMarks}` }}</template>
          <template slot="singleLabel" slot-scope="data">{{ `${data.option.name} - ${data.option.reportingMarks}` }}</template>
        </multiselect>
      </b-form-group>

      <b-form-group label="Road Number" label-for="roadNumberInput" :label-sr-only="true">
        <b-form-input
            id="roadNumberInput"
            type="text"
            v-model="locomotive.roadNumber"
            required
            placeholder="Road number"
        />
      </b-form-group>

      <b-form-group label="Model Number" label-for="modelNumberInput" :label-sr-only="true">
        <multiselect
          id="modelNumberInput"
          v-model="locomotive.type"
          :options="types.data"
          label="name"
          track-by="id"
          placeholder="Locomotive Model">
          <template slot="option" slot-scope="data">{{ `${data.option.manufacturer} - ${data.option.name}` }}</template>
          <template slot="singleLabel" slot-scope="data">{{ `${data.option.manufacturer} - ${data.option.name}` }}</template>
        </multiselect>
      </b-form-group>

      <b-form-group label="Serial Number" label-for="serialNumberInput" :label-sr-only="true">
        <b-form-input
            id="serialNumberInput"
            type="text"
            v-model="locomotive.serialNumber"
            required
            placeholder="Serial number"
        />
      </b-form-group>

      <b-form-group label="Frame Number" label-for="frameNumberInput" :label-sr-only="true">
        <b-form-input
            id="frameNumberInput"
            type="text"
            v-model="locomotive.frameNumber"
            required
            placeholder="Frame number"
        />
      </b-form-group>

      <div class="row">
        <div class="col-md-6">
          <b-form-group label="Build Month" label-for="buildMonthInput">
            <b-form-select
                id="buildMonthInput"
                :options="monthOptions"
                v-model="locomotive.buildMonth"
                placeholder="Build month"
            />
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group label="Build Year" label-for="buildYearInput">
            <b-form-input
                id="buildYearInput"
                type="text"
                v-model="locomotive.buildYear"
                placeholder="Build year (yyyy)"
            />
          </b-form-group>
        </div>
      </div>

      <b-form-group label="Notes" label-for="notesInput" :label-sr-only="true">
        <b-form-textarea
            id="notesInput"
            v-model="locomotive.notes"
            placeholder="Additional notes"
            rows=3
        />
      </b-form-group>

      <b-button type="submit" variant="primary">Save Locomotive</b-button>
    </b-form>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex'
import { FilterRoadsModel } from '@/models/rosters/Road';
import LocomotiveModel, { FilterLocomotivesModel } from '@/models/rosters/Locomotive';

export default {
  data () {
    return {
      error: null,
      locomotive: {
        id: 0,
        roadNumber: null,
        road: null,
        notes: null,
        type: null,
        modelNumber: null,
        serialNumber: null,
        frameNumber: null,
        buildMonth: null,
        buildYear: null
      },
      monthOptions: [
        { value: 1, text: 'January' },
        { value: 2, text: 'February' },
        { value: 3, text: 'March' },
        { value: 4, text: 'April' },
        { value: 5, text: 'May' },
        { value: 6, text: 'June' },
        { value: 7, text: 'July' },
        { value: 8, text: 'August' },
        { value: 9, text: 'September' },
        { value: 10, text: 'October' },
        { value: 11, text: 'November' },
        { value: 12, text: 'December' }
      ]
    }
  },
  async created() {
    await this.loadLocomotiveTypes()
  },
  computed: {
    ...mapGetters('roads', [
      'roads'
    ]),
    ...mapGetters('locomotiveTypes', [
      'types'
    ])
  },
  methods: {
    ...mapActions('roads', [
      'loadRoads'
    ]),
    ...mapActions('locomotives', [
      'addLocomotive'
    ]),
    ...mapActions('locomotiveTypes', [
      'loadLocomotiveTypes'
    ]),
    filterRoads: _.debounce(async function (query) {
      const filter = new FilterRoadsModel();
      filter.query = query;
      filter.pageSize = 100; // TODO: Figure out how to get pagination to work in MS

      await this.loadRoads(filter);
    }, 500),
    async saveLocomotive() {
      const locomotive = new LocomotiveModel({
        roadId: this.locomotive.road.id,
        road: null,
        roadNumber: this.locomotive.roadNumber,
        notes: this.locomotive.notes,
        modelNumber: this.locomotive.type.name,
        serialNumber: this.locomotive.serialNumber,
        frameNumber: this.locomotive.frameNumber,
        buildMonth: this.locomotive.buildMonth
          ? this.locomotive.buildMonth
          : null,
        buildYear: this.locomotive.buildYear
          ? this.locomotive.buildYear
          : null
      });

      this.addLocomotive(locomotive).then(locomotive => {
        this.$emit('locomotiveSaved', locomotive);
      });
    }
  }
}
</script>
