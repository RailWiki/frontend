<template>
  <div id="album-list">
    <h1>My Photo Albums</h1>

    <div class="page-actions my-2">
      <b-button variant="success" @click="showAddAlbum">Add Album</b-button>
    </div>

    <album-list :albums="userAlbums" />

    <b-modal v-model="isEditing" hide-footer :title="(id === 0 ? 'Add Album' : 'Edit Album')">
      <edit-album />
    </b-modal>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import AlbumList from '@/components/albums/AlbumList.vue';
import EditAlbum from './EditAlbum.vue';

export default {
  components: {
    AlbumList,
    EditAlbum
  },

  data() {
    return {

    };
  },

  async created() {
    await this.loadCurrentUserAlbums();
  },

  computed: {
    ...mapFields('albums', [
      'userAlbums',
      'editing.isEditing',
      'editing.album.id'
    ])
  },

  methods: {
    ...mapActions('albums', ['loadCurrentUserAlbums', 'showAddAlbum'])
  }
};
</script>
