<template>
  <div class="home">
    <h1>Welcome to RailWiki</h1>

    <b-row>
      <b-col cols="8">
        <latest-photos :maxPhotos="10" />
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
  </div>
</template>

<script>
import LatestPhotos from '@/components/photos/LatestPhotos.vue';

export default {
  name: 'Home',
  components: {
    LatestPhotos
  }
};
</script>
