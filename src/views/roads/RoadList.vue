<template>
  <div id="railroad-list">
    <h1>Railroads</h1>

    <b-row>
      <b-col cols="3">
        <road-type-list />
      </b-col>

      <b-col cols="9">
          <b-table
            small
            stacked="md"
            :items="roads.data"
            :fields="roadGridFields"
          >
            <template v-slot:cell(name)="data">
              <router-link :to="{name: 'roadDetails', params: { slug: data.item.slug } }">{{ data.value }}</router-link>
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
import RoadService from '@/services/roadService';
import RoadTypeList from '@/components/roads/RoadTypeList.vue'
import { FilterRoadsModel } from '@/models/rosters/Road';

export default {
  components: {
    RoadTypeList
  },
  data() {
    return {
      currentPage: 1,
      roadGridFields: [
        { key: 'name', label: 'Name' },
        { key: 'reportingMarks', label: 'Rpt Marks' },
        { key: 'locomotiveCount', label: 'Locomotives' },
        { key: 'rollingStockCount', label: 'Rolling Stock' }
      ]
    }
  },
  async created() {
    await this.load();
  },
  watch: {
    $route: 'load'
  },
  computed: {
    ...mapGetters('roads', [
      'isRoadsLoading',
      'currentRoadType',
      'roads'
    ]),
    totalRecords: function() {
      return this.roads ? this.roads.total : 0;
    },
    pageSize: function() {
      return this.roads ? this.roads.pageSize : 0;
    },
    pageCount: function() {
      return this.roads ? parseInt(this.roads.pageCount) : 0
    }
  },
  methods: {
    ...mapActions('roads', [
      'loadRoads',
      'loadRoadTypeBySlug'
    ]),
    async load() {
      const typeSlug = this.$route.params.typeSlug ? this.$route.params.typeSlug : 'major-carriers';
      const page = this.$route.query.page ? parseInt(this.$route.query.page) : 1;

      await this.loadRoadTypeBySlug(typeSlug);

      const roadFilter = new FilterRoadsModel();
      roadFilter.typeId = this.currentRoadType ? this.currentRoadType.id : null;
      roadFilter.page = page;

      await this.loadRoads(roadFilter);

      this.currentPage = page;
    },
    pagedLinkGen(pageNum) {
      return { name: 'roadsList', params: {...this.$route.params }, query: { page: pageNum } }
    }
  }
}
</script>
