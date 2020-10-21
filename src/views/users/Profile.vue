<template>
  <div class="user-profile">
    <template v-if="isLoading || !user">
      Loading...
    </template>
    <template v-else>
      <h1>{{ user.fullName }}</h1>

      <div class="row mt-2">
        <div class="col-md-9">
          <p class="user-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Recusandae corporis natus minus commodi nesciunt, asperiores id
            laboriosam tempora voluptates non sed facilis aliquid, voluptatibus
            blanditiis ex veniam sint, ab hic!
          </p>

          <hr />

          <h3>
            {{ `${userAlbums.length} ${userAlbums.length > 1 ? 'Albums' : 'Album' } `}}
          </h3>

          <album-list :albums="userAlbums" />

        </div>
        <div class="col-md-3">
          <user-stats :stats="userStats" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlbumList from '@/components/albums/AlbumList.vue';
import UserStats from '@/components/users/UserStats.vue';

export default {
  components: {
    AlbumList,
    UserStats
  },
  computed: {
    ...mapGetters('users', [
      'isLoading',
      'user',
      'userStats'
    ]),
    ...mapGetters('albums', [
      'userAlbums'
    ])
  },
  async created() {
    await this.loadUser();
  },
  watch: {
    $route: 'loadUser'
  },
  methods: {
    ...mapActions('users', [
      'loadBySlug'
    ]),
    ...mapActions('albums', [
      'loadUserAlbums'
    ]),
    async loadUser() {
      const userSlug = this.$route.params.userSlug;

      await this.loadBySlug(userSlug);
      await this.loadUserAlbums(this.user.id);
    }
  }
};
</script>
