<template>
  <div id="view-photo">
    <template v-if="isLoading || !currentPhoto">
      Loading...
    </template>

    <template v-else>
      <h1>{{ currentPhoto.title }}</h1>

      <img :src="currentPhoto.files.large" :alt="currentPhoto.title" :title="currentPhoto.title" />
    </template>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapGetters('photos', [
      'isLoading',
      'currentPhoto'
    ])
  },

  async created() {
    await this.refresh();
  },

  methods: {
    async refresh() {
      const albumId = parseInt(this.$route.params.albumId);
      const photoId = parseInt(this.$route.params.photoId);

      console.log('refresh');
      await this.$store.dispatch('photos/loadPhoto', {albumId, photoId}).then(() => {
        console.log('loaded photo');
      })
    }
  }
}
</script>
