<template>
  <div id="view-album">
    <template v-if="isLoading">
      Loading...
    </template>

    <template v-if="!isLoading">
      <h1>{{ album.title }}</h1>

      <div class="d-flex justify-content-between">
        <h5>
          By
          <router-link :to="{ name: 'userProfile', params: { userId: album.userId } }">
            {{ album.user.fullName }}
          </router-link>
        </h5>

        <div class="album-info">
          <h5>{{ albumPhotos.length }} photos</h5>
          <!-- TODO: Add date range of photos -->
        </div>
      </div>

      <div class="actions my-2" v-if="canEdit">
        <b-button variant="secondary" @click='editAlbum(album)'>Edit</b-button>
      </div>

      <photo-uploader v-if="canEdit" :albumId="album.id" class="mb-2" />

      <grid-view :photos="albumPhotos" class="mt-4" />

    </template>

    <b-modal v-model="isEditing" hide-footer title="Edit Album">
      <edit-album />
    </b-modal>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions, mapGetters } from 'vuex';
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
    ...mapGetters([
      'currentUser'
    ]),
    canEdit: function() {
      return this.currentUser && this.currentUser.id === this.album.userId
    }
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
