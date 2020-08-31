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

export default {
  components: {
    'edit-album': EditAblum
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
      'editing.isEditing'
    ])
  },

  methods: {
    ...mapActions('albums', [ 'loadAlbum', 'editAlbum' ]),

    async loadPage() {
      const albumId = parseInt(this.$route.params.albumId);
      await this.$store.dispatch('albums/loadAlbum', albumId);
    }
  }
}
</script>

