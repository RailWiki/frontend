<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <div class="container">
      <b-navbar-brand to="/">RailPhotos</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <template v-if="isAuthenticated">
            <b-nav-item to="/teams">Teams</b-nav-item>
          </template> -->
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>
