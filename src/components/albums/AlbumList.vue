<template>
  <div class="row row-cols-1 row-cols-md-3">
    <div class="col mb-4" v-for="album in albums" :key="album.id">
      <div class="card">
        <img src="https://placehold.it/362x190" class="card-img-top" alt="...">
        <div class="card-body">
          <router-link :to="{ name: 'viewAlbum', params: { albumId: album.id } }">
            <h5 class="card-title">
              {{ album.title}}
            </h5>
          </router-link>
          <p class="card-text">
            {{ album.description}}
          </p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <small class="text-muted">
            Updated {{ album.updatedOn | moment('from', 'now')}}
          </small>

          <span class="actions">
            <!-- <b-button size="sm" variant="link">Edit</b-button> -->
          </span>
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
  }
};
</script>
