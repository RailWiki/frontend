<template>
  <div id="user-list">
    <template v-if="isLoading || !users || !users.data">
      Loading...
    </template>
    <template v-else>
      <h1>Users</h1>

      <b-row>
        <b-col cols="3">

        </b-col>

        <b-col cols="9">
          <div class="user-grid">
            <div class="row row-cols-1 row-cols-md-3">
              <div class="col mb-4" v-for="user in users.data" :key="user.id">
                <div class="card">
                  <router-link :to="{name: 'userProfile', params: { userId: user.id } }">
                    <img src="https://via.placeholder.com/150" class="card-img-top" :alt="user.fullName" />
                  </router-link>
                  <div class="card-body">
                    <router-link :to="{name: 'userProfile', params: { userId: user.id } }">
                      {{ user.fullName }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('users', [
      'isLoading',
      'users'
    ])
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    ...mapActions('users', [
      'loadUsers'
    ])
  }
};
</script>
