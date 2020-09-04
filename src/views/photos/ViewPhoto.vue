<template>
  <div id="view-photo">
    <template v-if="isLoading || !currentPhoto">
      Loading...
    </template>

    <template v-else>
      <h1>
        {{ currentPhoto.title }}
        <small>{{ currentPhoto.album.title }}</small>
      </h1>

      <div class="actions mb-2" v-if="currentUser && currentPhoto.userId === currentUser.id">
        <b-button variant="outline-secondary" v-b-toggle.sidebar-editing>Edit Properties</b-button>
      </div>

      <img :src="currentPhoto.files.large" :alt="currentPhoto.title" :title="currentPhoto.title" />

      <b-sidebar id="sidebar-editing" title="Edit Photo" right shadow>
        <div class="px-3 py-2">
          <edit-photo-properties :photo="currentPhoto" />
        </div>
      </b-sidebar>
    </template>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex';
import EditPhotoProperties from '@/components/photos/EditPhotoProperties.vue';

export default {
  components: {
    EditPhotoProperties
  },

  data() {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'currentUser'
    ]),
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
      const photoId = parseInt(this.$route.params.photoId);

      await this.$store.dispatch('photos/loadPhoto', photoId).then(() => {
        // nothing else to do
      })
    }
  }
}
</script>
