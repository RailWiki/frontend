<template>
  <div id="photo-grid">
    <div class="row row-cols-1 row-cols-md-3">
      <div class="col mb-4" v-for="photo in photos" :key="photo.id">
        <div class="card">
          <router-link :to="{name: 'viewPhoto', params: { photoId: photo.id } }">
            <img :src="photo.files.small" class="card-img-top" :alt="photo.title" />
          </router-link>
          <div class="card-body">
            <router-link :to="{name: 'viewPhoto', params: { photoId: photo.id } }">
              {{ photo.title }}
            </router-link>
          </div>
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
    }
  }
}
</script>
