<template>
  <div id="road-details">
    <template v-if="!currentRoad">
      Loading...
    </template>
    <template v-else>
      <h1>{{ currentRoad.name }}</h1>

      <div class="row">
        <div class="col-md-6">
          <dl class="row">
            <dt class="col-md-4">Reporting Mark</dt>
            <dd class="col-md-8">{{ currentRoad.reportingMarks }}</dd>

            <dt class="col-md-4">Old Name</dt>
            <dd class="col-md-8"><i>TBD</i></dd>

            <dt class="col-md-4">Type</dt>
            <dd class="col-md-8"><i>TBD</i></dd>

            <dt class="col-md-4">Web Site</dt>
            <dd class="col-md-8"></dd>
          </dl>
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('roads', [
      'currentRoad'
    ])
  },
  async created() {
    await this.refresh();
  },
  watch: {
    $route: 'refresh'
  },
  methods: {
    ...mapActions('roads', [
      'loadRoad'
    ]),
    async refresh() {
      const id = parseInt(this.$route.params.id);
      await this.loadRoad(id);
    }
  }
}
</script>
