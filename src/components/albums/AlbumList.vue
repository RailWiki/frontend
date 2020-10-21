<template>
  <div class="row row-cols-1 row-cols-md-3">
    <div class="col mb-4" v-for="album in albums" :key="album.id">
      <div class="card">
        <router-link :to="{ name: 'viewAlbum', params: { albumId: album.id } }">
          <img :src="getCoverPhotoUrl(album)" class="card-img-top" alt="...">
        </router-link>
        <div class="card-body">
          <router-link :to="{ name: 'viewAlbum', params: { albumId: album.id } }">
            <h5 class="card-title">
              {{ album.title}}
            </h5>
          </router-link>
          <div class="card-text">
            <small class="text-muted">
              Updated {{ album.updatedOn | moment('from', 'now')}}
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    albums: {
      type: Array
    }
  },
  methods: {
    getCoverPhotoUrl(album) {
      return album.coverPhotoUrl
        ? album.coverPhotoUrl
        : 'https://placehold.it/362x190';
    }
  }
};
</script>
