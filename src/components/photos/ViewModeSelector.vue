<template>
  <div class="view-selector">
    <b-button-group>
      <b-button :variant="viewMode === 'grid' ? 'secondary' : 'outline-secondary'" :disabled="viewMode === 'grid'" @click="setViewMode('grid')">Grid</b-button>
      <b-button :variant="viewMode === 'list' ? 'secondary' : 'outline-secondary'" :disabled="viewMode === 'list'" @click="setViewMode('list')">List</b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
  props: {
    viewMode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mode: this.viewMode
    }
  },
  methods: {
    setViewMode(mode) {
      this.mode = mode;
      this.$emit('viewChanged', mode);
    }
  }
}
</script>
