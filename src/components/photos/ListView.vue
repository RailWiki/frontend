<template>
  <div id="photo-list">
    <div class="photo d-flex my-4" v-for="photo in photos" :key="photo.id">
      <div class="image pr-4">
        <router-link :to="{name: 'viewPhoto', params: { photoId: photo.id } }">
          <img :src="photo.files.small" class="shadow-sm" :alt="photo.title" />
        </router-link>
      </div>
      <div class="details">
        <router-link :to="{name: 'viewPhoto', params: { photoId: photo.id } }">
          {{ photo.title }}
        </router-link>

        <div v-if="showAuthor && photo.userName">
          <b>Author</b> {{ photo.userName }}
        </div>
        <div v-if="showLocation && photo.location">
          <b>Location</b> {{ photo.location.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoModel from '@/models/photos/Photo';

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
    }
  }
}
</script>

<style lang="scss" scoped>
  .photo {
    .image {
      flex: 0 0 200px;
      img {
        max-width: 190px;
      }
    }
    .details {
      flex: 1 1 auto;
    }
  }
</style>
