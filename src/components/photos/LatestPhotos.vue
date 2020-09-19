<template>
  <div class="latest-photos">
    <h2 v-if="showHeading">Latest photos</h2>

    <list-view
      :photos="latestPhotos"
      :showAuthor="true"
      :showLocation="true"
      photoSize="xs"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ListView from './ListView.vue';

export default {
  props: {
    showHeading: {
      type: Boolean,
      default: true
    },
    maxPhotos: {
      type: Number,
      default: 10
    }
  },
  components: {
    ListView
  },
  async created(){
    await this.loadLatestPhotos(this.maxPhotos)
  },
  computed: {
    ...mapGetters('photos', [
      'isLoading',
      'latestPhotos'
    ])
  },
  methods: {
    ...mapActions('photos', [
      'loadLatestPhotos'
    ])
  }

}
</script>
