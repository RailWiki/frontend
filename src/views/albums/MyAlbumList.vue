<template>
  <div id="album-list">
    <h1>My Photo Albums</h1>

    <div class="page-actions my-2">
      <b-button variant="success" @click="showAddAlbum">Add Album</b-button>
    </div>

    <div class="row row-cols-1 row-cols-md-3">
      <div class="col mb-4" v-for="album in userAlbums" :key="album.id">
        <div class="card">
          <img src="https://placehold.it/362x190" class="card-img-top" alt="...">
          <div class="card-body">
            <router-link :to="{ name: 'viewAlbum', params: { albumId: album.id } }">
              <h5 class="card-title">
                {{ album.title}}
              </h5>
            </router-link>
            <p class="card-text">
              {{ album.description}}
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small class="text-muted">
              Updated {{ album.updatedOn | moment('from', 'now')}}
            </small>

            <span class="actions">
              <!-- <b-button size="sm" variant="link">Edit</b-button> -->
            </span>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="isEditing" hide-footer :title="(id === 0 ? 'Add Album' : 'Edit Album')">
      <edit-album @albumSaved="albumSaved" />
    </b-modal>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import EditAlbum from './EditAlbum.vue';
import AlbumModel from '@/models/photos/Album';

export default {
  components: {
    EditAlbum
  },

  data() {
    return {

    }
  },

  async created() {
    await this.loadCurrentUserAlbums()
  },

  computed: {
    ...mapFields('albums', [
      'userAlbums',
      'editing.isEditing',
      'editing.album.id'
    ])
  },

  methods: {
    ...mapActions('albums', [ 'loadCurrentUserAlbums', 'showAddAlbum' ]),

    async albumSaved(evt) {

    }
  }
}
</script>
