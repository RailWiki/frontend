<template>
  <div id="locomotive-list">
    <h1>Locomotives</h1>

    <b-row>
      <b-col cols="3">
        <locomotive-filters />
      </b-col>

      <b-col cols="9">
        <b-table
          small
          stacked="sm"
          :items="locomotives.data"
          :fields="locomotiveGridFields">

            <template v-slot:cell(roadNumber)="data">
              <router-link :to="{name: 'locomotiveDetails', params: { id: data.item.id } }">{{ data.value }}</router-link>
            </template>

        </b-table>

        <b-pagination-nav
          v-if="pageCount > 1"
          v-model="currentPage"
          no-page-detect
          :number-of-pages="pageCount"
          :link-gen="pagedLinkGen"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LocomotiveFilters from '@/components/locomotives/LocomotiveFilters.vue'


export default {
  components: {
    LocomotiveFilters
  },
  data() {
    return {
      currentPage: 1,
      locomotiveGridFields: [
        { key: 'roadNumber', label: 'Road Number' },
        { key: 'modelNumber', label: 'Model Number' },
        { key: 'serialNumber', label: 'Serial Number' }
      ]
    }
  },
  async created() {
    await this.loadLocomotives();
  },
  computed: {
    ...mapGetters('locomotives', [
      'isLoading',
      'locomotives',
      'filters'
    ]),
    totalRecords: function() {
      return this.locomotives ? this.locomotives.total : 0
    },
    pageSize: function() {
      this.locomotives ? this.locomotives.pageSize : 0
    },
    pageCount: function() {
      this.locomotives ? this.locomotives.pageCount : 0
    }
  },
  methods: {
    ...mapActions('locomotives', [
      'loadLocomotives',
      'setFilters'
    ])
  }
}
</script>
