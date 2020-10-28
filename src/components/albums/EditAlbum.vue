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
      <b-form-group label="Location" label-for="">
        <location-selector
          :value="location"
          @change="locationChanged"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Save Album</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import LocationSelector from '@/components/common/LocationSelector.vue';

export default {
  components: {
    LocationSelector
  },
  data() {
    return {

    };
  },

  computed: {
    ...mapFields('albums', [
      'editing.id',
      'editing.title',
      'editing.description',
      'editing.location',
      'editing.error'
    ])
  },

  methods: {
    ...mapActions('albums', ['save']),

    async saveAlbum() {
      this.save().then(() => {
        this.$emit('album-saved');
      });
    },
    locationChanged(location) {
      this.location = location;
    }
  }
};

</script>
