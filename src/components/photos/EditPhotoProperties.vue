<template>
  <div id="edit-photo-properties">
    <b-form @submit.prevent="savePhoto">
      <!-- <b-alert :show="error !== null" variant="danger">
        {{error}}
      </b-alert> -->
      <b-form-group label="Title" label-for="titleInput">
        <b-form-input
            id="titleInput"
            type="text"
            v-model="photo.title"
            required
            placeholder="Photo title"
        />
      </b-form-group>
      <b-form-group label="Description" label-for="descriptionInput">
        <b-textarea
          id="descriptionInput"
          v-model="photo.description"
          rows="5"
          placeholder="Description of the photo"
        />
      </b-form-group>
      <b-form-group label="Author" label-for="authorInput">
        <b-form-input
            id="authorInput"
            type="text"
            v-model="photo.author"
            placeholder="Original author of the photo"
        />
      </b-form-group>
      <b-form-group label="Location" label-for="locationInput">
        <b-form-input
            id="locationInput"
            type="text"
            v-model="photo.locationName"
            placeholder="Location of the photo"
        />
      </b-form-group>
      <b-form-group label="Photo taken on" label-for="photoDateInput">
        <b-form-datepicker
          id="photoDateInput"
          v-model="photo.photoDate"
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
        />
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="isSaving">
        Save Photo
        <b-spinner small v-if="isSaving" class="ml-2"></b-spinner>
      </b-button>
    </b-form>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import PhotoModel from '@/models/photos/Photo'

export default {
  props: {
    photo: {
      type: PhotoModel
    }
  },

  computed: {
    ...mapGetters('photos', [
      'isSaving',
      'editingError'
    ])
  },

  methods: {
    ...mapActions('photos', [
      'updatePhoto'
    ]),
    async savePhoto() {
      await this.updatePhoto(this.photo);
    }
  }
}
</script>
