<template>
  <div class="about">
    <h1> Our stores visited us</h1>

<GmapMap
      class="map"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
    />
  </div>
</template>
<script>
import GmapMap from '@/cmp/map-location.vue'

export default ({
components: {
    GmapMap
  },
})
</script>

