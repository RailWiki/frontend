<template>
  <div class="user-stats">
    <dl class="row">
      <dt class="col-md-8">Photos</dt>
      <dd class="col-md-4">{{ stats.photoCount }}</dd>

      <dt class="col-md-8">Locomotives</dt>
      <dd class="col-md-4">{{ stats.locomotiveCount }}</dd>

      <dt class="col-md-8">Rolling Stock</dt>
      <dd class="col-md-4">{{ stats.rollingStockCount }}</dd>

      <dt class="col-md-8">Locations</dt>
      <dd class="col-md-4">{{ stats.locationCount }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>
