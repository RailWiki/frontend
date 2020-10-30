<template>
  <div id="view-photo">
    <template v-if="isLoading || !currentPhoto">
      Loading...
    </template>

    <template v-else>
      <div class="header d-flex justify-content-between">
        <h1>{{ currentPhoto.title }}</h1>

        <div class="actions mt-2" v-if="canEdit">
          <b-button variant="outline-secondary" @click="openEditor">Edit Properties</b-button>
        </div>
      </div>

      <hr />

      <ul class="photo-properties list-inline">
        <li class="list-inline-item" v-if="currentPhoto.photoDate">
          <b>Taken on</b> {{ currentPhoto.photoDate | moment('YYYY-MM-DD') }}
        </li>

        <li class="list-inline-item" v-if="currentPhoto.author">
          <b>Author</b> {{ currentPhoto.author }}
        </li>

        <li class="list-inline-item" v-if="currentPhoto.location">
          <b>Location</b> {{ currentPhoto.location.name }}
        </li>

        <li class="list-inline-item">
          <b>Album </b>
          <router-link :to="{ name: 'viewAlbum', params: { albumId: currentPhoto.albumId } }">
            {{ currentPhoto.album.title }}
          </router-link>
        </li>

        <li class="list-inline-item">
          <b>Collection of </b>
          <router-link :to="{name: 'userProfile', params: { userSlug: currentPhoto.user.slug } }">
            {{ currentPhoto.user.fullName }}
          </router-link>
        </li>

        <li class="list-inline-item locomotives">
          <b>Locomotives </b>
          <b-badge
            :to="{ name: 'locomotiveDetails', params: { id: loco.locomotive.id } }"
            v-for="loco in photoLocomotives"
            :key="loco.locomotive.id"
          >
            {{ loco.locomotive.reportingMarks }}
          </b-badge>
        </li>
      </ul>

      <img
        :src="currentPhoto.files.large"
        :alt="currentPhoto.title"
        :title="currentPhoto.title"
        class="photo"
      />

      <b-sidebar
        v-model="showEditor"
        title="Edit Photo"
        width="400px"
        right
        shadow
        lazy
        v-if="canEdit"
      >
        <div class="px-3 py-2">
          <edit-photo-properties
            :photo="currentPhoto"
            :locomotives="locomotives"
            @photo-saved="photoSaved"
          />
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
      showEditor: false
    };
  },

  computed: {
    ...mapGetters([
      'currentUser',
      'isCurrentUserApproved'
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
    },
    canEdit() {
      return this.currentUser
        && this.isCurrentUserApproved
        && this.currentUser.id === this.currentPhoto.user.id;
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
    },

    openEditor() {
      this.showEditor = true;
    },

    photoSaved() {
      this.showEditor = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-properties {
  .list-inline-item {
    margin-right: 2rem;
  }

  .locomotives {
    .badge {
      margin-right: 0.25rem;
    }
  }
}
.photo {
  width: 100%;
}
</style>
