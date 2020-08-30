<template>
  <div id="edit-album-props">
    <b-form @submit.prevent="saveAlbum">
      <b-alert :show="error !== null" variant="danger">
        {{error}}
      </b-alert>
      <b-form-group label="Album title" label-for="titleInput" :label-sr-only="true">
        <b-form-input
            id="titleInput"
            type="text"
            v-model="title"
            required
            placeholder="Album title"
        />
      </b-form-group>
      <b-form-group label="Description" label-for="descriptionInput" :label-sr-only="true">
        <b-textarea
          id="descriptionInput"
          v-model="description"
          placeholder="Description"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Save Album</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import AlbumModel from '@/models/photos/Album';

export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapFields('albums', [
      'editing.album.id',
      'editing.album.title',
      'editing.album.description',
      'editing.error',
    ])
  },

  methods: {
    ...mapActions('albums', [ 'save' ]),

    async saveAlbum() {
      this.save().then(() => {
        this.$emit('albumSaved');
      })
    }
  }
}

</script>
