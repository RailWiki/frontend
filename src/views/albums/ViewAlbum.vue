<template>
  <div id="view-album">
    <template v-if="isLoading">
      Loading...
    </template>

    <template v-if="!isLoading">

      <div class="d-flex justify-content-between">
        <h1>{{ viewing.title }}</h1>

        <div class="album-actions my-2" v-if="canEdit">
          <b-dropdown right text="" variant="outline-secondary">
            <template #button-content>
              <b-icon-gear />
            </template>
            <b-dropdown-item @click="addPhotos">Add Photos</b-dropdown-item>
            <b-dropdown-item @click="editAlbum(viewing)">Edit Album</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <h5>
        {{ albumPhotos.length }} photos
        by
        <router-link :to="{ name: 'userProfile', params: { userSlug: viewing.user.slug } }">
          {{ viewing.user.fullName }}
        </router-link>
      </h5>

      <template v-if="viewing.description">
        <p class="album-description my-2">
          {{ viewing.description }}
        </p>

        <hr />
      </template>

      <b-modal
        v-model="showAddPhotos"
        title="Add Photos"
        no-close-on-backdrop
        hide-footer
      >
        <photo-uploader
          v-if="canEdit"
          :albumId="viewing.id"
          @photos-added="photosAdded"
        />
      </b-modal>

      <grid-view
        :photos="albumPhotos"
        class="mt-4"
        :showEditOptions="canEdit"
        @set-album-cover="setCoverPhoto"
      />
    </template>

    <b-modal
      v-model="isEditing"
      title="Edit Album"
      no-close-on-backdrop
      hide-footer
    >
      <edit-album />
    </b-modal>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions, mapGetters } from 'vuex';
import { BIconGear } from 'bootstrap-vue';
import EditAblum from './EditAlbum.vue';

import PhotoUploader from '../../components/photos/PhotoUploader.vue';
import GridView from '@/components/photos/GridView.vue';

export default {
  components: {
    'edit-album': EditAblum,
    PhotoUploader,
    GridView,
    BIconGear
  },

  data() {
    return {
      showAddPhotos: false
    };
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
      'viewing',
      'editing.isEditing',
      'albumPhotos'
    ]),
    ...mapGetters([
      'currentUser',
      'isCurrentUserApproved'
    ]),
    canEdit() {
      return this.currentUser
        && this.isCurrentUserApproved
        && this.currentUser.id === this.viewing.user.id;
    }
  },

  methods: {
    ...mapActions('albums', [
      'loadAlbum',
      'editAlbum',
      'loadAlbumPhotos',
      'setAlbumCover'
    ]),

    addPhotos() {
      this.showAddPhotos = true;
    },
    async loadPage() {
      const albumId = parseInt(this.$route.params.albumId);
      await this.$store.dispatch('albums/loadAlbum', albumId);
      await this.loadAlbumPhotos(albumId);
    },
    async photosAdded() {
      this.showAddPhotos = false;
    },
    async setCoverPhoto(photo) {
      await this.setAlbumCover({ albumId: this.id, photoId: photo.id });
    }
  }
};
</script>
