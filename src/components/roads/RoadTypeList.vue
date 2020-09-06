<template>
  <div class="road-type-list">
    <b-list-group flush>
      <b-list-group-item
        v-for="type in sortedTypes"
        :key="type.id"
        :to="{name: 'roadsList', params: { typeSlug: type.slug } }"
        :active="currentRoadType && currentRoadType.id === type.id">
        {{ type.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  async created() {
    await this.loadRoadTypes();
  },
  computed: {
    ...mapGetters('roads', [
      'isLoading',
      'roadTypes',
      'currentRoadType'
    ]),
    sortedTypes: function() {
      return this.roadTypes.sort((a, b) => {
        return a.displayOrder > b.displayOrder
      })
    }
  },
  methods: {
    ...mapActions('roads', [
      'loadRoadTypes'
    ])
  }
}
</script>
