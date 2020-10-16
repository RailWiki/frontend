<template>
  <div id="photo-list">
    <div class="photo d-flex my-4" :class="photoSize" v-for="photo in photos" :key="photo.id">
      <div class="image pr-4">
        <router-link :to="{name: 'viewPhoto', params: { photoId: photo.id } }">
          <img
            :src="photo.files.small"
            class="shadow-sm"
            :alt="photo.title"
            :title="photo.title" />
        </router-link>
      </div>
      <div class="details">
        <dl class="row">
          <!-- TODO: On mobile, drop details below photo and full-width -->

          <dt class="col-md-3">Title</dt>
          <dd class="col-md-9">
            <router-link :to="{name: 'viewPhoto', params: { photoId: photo.id } }" :title="photo.title">
              {{ photo.title | truncate(50) }}
            </router-link>
          </dd>

          <template v-if="showAuthor && photo.userName">
            <dt class="col-md-3">Author</dt>
            <dd class="col-md-9">{{ photo.userName }}</dd>
          </template>

          <template v-if="showLocation && photo.location">
            <dt class="col-md-3">Location</dt>
            <dd class="col-md-9">{{ photo.location.name }}</dd>
          </template>

          <dt class="col-md-3">Taken On</dt>
          <dd class="col-md-9">
            {{ photo.photoDate | moment('YYYY-MM-DD') }}
          </dd>
        </dl>
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
    photoSize: {
      type: String,
      default: 'sm'
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
    &.xs {
      .image {
        flex: 0 0 185px;

        img {
          max-width: 175px;
        }
      }
    }
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
