<template>
  <div id="photo-grid">
    <div class="row row-cols-1 row-cols-md-3">
      <div class="col mb-4" v-for="photo in photos" :key="photo.id">
        <div class="card">
          <router-link :to="{name: 'viewPhoto', params: { photoId: photo.id } }">
            <img :src="photo.files.small" class="card-img-top" :alt="photo.title" />
          </router-link>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="photo-details">
                <router-link :to="{name: 'viewPhoto', params: { photoId: photo.id } }">
                  {{ photo.title }}
                </router-link>

                <div v-if="showAuthor && photo.userName">
                  {{ photo.userName }}
                </div>
                <div v-if="showLocation && photo.location">
                  {{ photo.location.name }}
                </div>
              </div>

              <div class="edit-options" v-if="showEditOptions">
                <b-button
                  variant="none"
                  class="p-0"
                  v-b-tooltip.hover="'Set this image as the album cover photo'"
                  @click="setPhotoAsAlbumCover(photo)"
                >
                  <b-icon-image />
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconImage } from 'bootstrap-vue';

export default {
  props: {
    photos: {
      type: Array
    },
    showAuthor: {
      type: Boolean,
      default: false
    },
    showLocation: {
      type: Boolean,
      default: false
    },
    showEditOptions: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BIconImage
  },
  methods: {
    setPhotoAsAlbumCover(photo) {
      this.$emit('set-album-cover', photo);
    }
  }
};
</script>
