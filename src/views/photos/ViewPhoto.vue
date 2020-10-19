<template>
  <div id="view-photo">
    <template v-if="isLoading || !currentPhoto">
      Loading...
    </template>

    <template v-else>
      <div class="header d-flex justify-content-between">
        <h1>{{ currentPhoto.title }}</h1>
      </div>

      <ul class="photo-properties list-inline">
        <li class="list-inline-item">
          <b>Taken on</b> {{ currentPhoto.photoDate | moment('YYYY-MM-DD') }}
        </li>

        <li class="list-inline-item">
          <b>Author</b> {{ currentPhoto.author }}
        </li>

        <li class="list-inline-item" v-if="currentPhoto.location">
          <b>Location</b> {{ currentPhoto.location.name }}
        </li>

        <li class="list-inline-item">
          <b>Album</b> <router-link :to="{ name: 'viewAlbum', params: { albumId: currentPhoto.albumId } }">{{ currentPhoto.album.title }}</router-link>
        </li>

        <li class="list-inline-item">
          <b>Collection of</b> {{ currentPhoto.userName }}
        </li>
      </ul>

      <div class="actions mb-2">
        <b-button variant="outline-secondary" v-b-toggle.sidebar-editing>Edit Properties</b-button>
      </div>

      <img :src="currentPhoto.files.large" :alt="currentPhoto.title" :title="currentPhoto.title" />

      <b-sidebar id="sidebar-editing" title="Edit Photo" right shadow lazy>
        <div class="px-3 py-2">
          <edit-photo-properties :photo="currentPhoto" :locomotives="locomotives" />
        </div>
      </b-sidebar>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditPhotoProperties from '@/components/photos/EditPhotoProperties.vue';

export default {
  components: {
    EditPhotoProperties
  },

  data() {
    return {

    };
  },

  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    ...mapGetters('photos', [
      'isLoading',
      'currentPhoto'
    ]),
    ...mapGetters('locomotivePhotos', {
      photoLocomotives: 'locomotives'
    }),
    locomotives() {
      return this.photoLocomotives.map((x) => x.locomotive);
    }
  },

  async created() {
    await this.refresh();
  },

  methods: {
    ...mapActions('locomotivePhotos', [
      'loadPhotoLocomotives'
    ]),

    async refresh() {
      const photoId = parseInt(this.$route.params.photoId);

      await this.$store.dispatch('photos/loadPhoto', photoId).then(() => {
        // nothing else to do
      });

      await this.loadPhotoLocomotives(photoId);
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-properties {
  .list-inline-item {
    margin-right: 2rem;
  }
}
</style>
