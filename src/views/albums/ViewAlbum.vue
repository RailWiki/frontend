<template>
  <div id="view-album">
    <template v-if="isLoading">
      Loading...
    </template>

    <template v-if="!isLoading">
      <h1>{{ album.title }}</h1>

      <div class="actions my-2">
        <b-button variant="secondary" @click='editAlbum(album)'>Edit</b-button>
      </div>

      <!-- TODO: Only show for album owner -->
      <photo-uploader :albumId="album.id" class="mb-2" />

      <grid-view :photos="albumPhotos" />

    </template>

    <b-modal v-model="isEditing" hide-footer title="Edit Album">
      <edit-album />
    </b-modal>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import EditAblum from './EditAlbum.vue';
import AlbumModel from '../../models/photos/Album';

import PhotoUploader from '../../components/photos/PhotoUploader.vue';
import GridView from '@/components/photos/GridView.vue';

export default {
  components: {
    'edit-album': EditAblum,
    PhotoUploader,
    GridView
  },

  data() {
    return {

    }
  },

  async created() {
    this.loadPage();
  },

  watch: {
    $route: 'loadPage'
  },

  computed: {
    ...mapFields('albums', [
      'isLoading',
      'viewing.album',
      'editing.isEditing',
      'albumPhotos'
    ]),
    // ...mapFields([
    //   'currentUser'
    // ]),
  },

  methods: {
    ...mapActions('albums', [ 'loadAlbum', 'editAlbum', 'loadAlbumPhotos' ]),

    async loadPage() {
      const albumId = parseInt(this.$route.params.albumId);
      await this.$store.dispatch('albums/loadAlbum', albumId);
      await this.loadAlbumPhotos(albumId);
    }
  }
}
</script>

