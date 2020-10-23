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
            v-model="editingPhoto.title"
            required
            placeholder="Photo title"
        />
      </b-form-group>
      <b-form-group label="Description" label-for="descriptionInput">
        <b-textarea
          id="descriptionInput"
          v-model="editingPhoto.description"
          rows="5"
          placeholder="Description of the photo"
        />
      </b-form-group>
      <b-form-group label="Author" label-for="authorInput">
        <b-form-input
            id="authorInput"
            type="text"
            v-model="editingPhoto.author"
            placeholder="Original author of the photo"
        />
      </b-form-group>
      <b-form-group label="Location" label-for="locationInput">
        <b-form-input
            id="locationInput"
            type="text"
            v-model="editingPhoto.locationName"
            placeholder="Location of the photo"
        />
      </b-form-group>
      <b-form-group label="Photo taken on" label-for="photoDateInput">
        <b-form-datepicker
          id="photoDateInput"
          v-model="editingPhoto.photoDate"
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
        />
      </b-form-group>

      <b-form-group label="Locomotives" label-for="thing">
        <multiselect
          id="locomotiveSelect"
          v-model="selectedLocomotives"
          :options="locomotiveOptions.data"
          multiple
          label="reportingMarks"
          track-by="reportingMarks"
          @search-change="filterLocomotives"
          :internal-search="false"
          placeholder="Search for a locomotive by its road number (ie UP 1234)"
        />
        <slot name="description">
          <b-button
            size="sm"
            variant="outline-success"
            class="mt-2"
            @click="showAddLocomotive">
              Add a locomotive
            </b-button>
        </slot>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="isSaving">
        Save Photo
        <b-spinner small v-if="isSaving" class="ml-2"></b-spinner>
      </b-button>
    </b-form>

    <b-modal id="modal-add-locomotive"
      title="Add New Locomotive"
      no-close-on-backdrop
      hide-footer
    >
      <locomotive-editor @locomotive-saved="newLocomotiveAdded" />
    </b-modal>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import PhotoModel from '@/models/photos/Photo';
import { FilterLocomotivesModel } from '@/models/rosters/Locomotive';
import LocomotiveEditor from '@/components/locomotives/LocomotiveEditor.vue';

export default {
  props: {
    photo: {
      type: PhotoModel
    },
    locomotives: {
      type: Array
    }
  },
  components: {
    LocomotiveEditor
  },
  data() {
    return {
      editingPhoto: {},
      selectedLocomotives: []
    };
  },
  mounted() {
    this.editingPhoto = this.photo;
    this.selectedLocomotives = this.locomotives;
  },
  computed: {
    ...mapGetters('photos', [
      'isSaving',
      'editingError'
    ]),
    ...mapGetters('locomotives', {
      locomotiveOptions: 'locomotives'
    })
  },
  methods: {
    ...mapActions('photos', [
      'updatePhoto'
    ]),
    ...mapActions('locomotives', [
      'search',
      'clearFilters'
    ]),
    ...mapActions('locomotivePhotos', {
      updatePhotoLocomotives: 'update'
    }),
    async savePhoto() {
      await this.updatePhoto(this.editingPhoto);

      const locoIds = this.selectedLocomotives.map((x) => x.id);
      // TODO: saving photo locos is failing
      await this.updatePhotoLocomotives({ photoId: this.photo.id, locoIds });

      this.$emit('photo-saved');
    },

    filterLocomotives: _.debounce(async function(query) {
      // TODO: When you search/filter with this, it's setting the filter in state
      // which means that when you go to /locomotives, the filter is still applied
      // and you have to remove it manually... Ideally, we wouldn't store this
      // particular filter in state (and probably some others too...)
      const filter = new FilterLocomotivesModel();
      filter.roadNumber = query;

      await this.search(filter);
    }, 500),

    showAddLocomotive() {
      this.$bvModal.show('modal-add-locomotive');
    },

    newLocomotiveAdded(newLocomotive) {
      this.selectedLocomotives.push(newLocomotive);
      this.$bvModal.hide('modal-add-locomotive');
    }
  }
};
</script>
