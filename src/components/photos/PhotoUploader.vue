<template>
  <div class="photo-uploader">
    <b-overlay :show="isUploading">
      <b-form-group>
        <b-form-file
          v-model="files"
          multiple
          accept="image/*"
          placeholder="Select your photo(s) or drop them here to upload"
          drop-placeholder="Drop your photo(s) here to upload"
          class="mb-2"
        />

        <b-button variant="primary" @click="saveTest" :disabled="!hasFiles">Upload photos</b-button>
      </b-form-group>
    </b-overlay>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import PhotoService from '../../services/photoService';

export default {
  props: {
    albumId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      files: []
    }
  },
  computed: {
    ...mapFields('albums', [
      'isUploading'
    ]),
    hasFiles: function() { return this.files && this.files.length > 0 }
  },
  methods: {
    ...mapActions('albums', [ 'uploadPhotos' ]),
    async saveTest() {
      // TODO: actual implementation. Use vuex store?
      await this.uploadPhotos({ albumId: this.albumId, files: this.files});
      this.files = [];
    }
  }
}
</script>
