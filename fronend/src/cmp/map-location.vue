<template>
  <GmapMap
    :center="center"
    :zoom="7"
    map-type-id="terrain"
    style="width: 80vw; height: 50vh"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center = m.position"
    />
  </GmapMap>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        { position: { lat: 32.091059131759394, lng: 34.77440723987541 } },
        { position: { lat: 32.43382580650471, lng: 34.90244521912429} },
        { position: { lat: 32.01434163333285, lng:34.75246670465912 } },
      ],
      center: { lat: 32.091059131759394, lng: 34.77440723987541 },
    };
  },
};
</script>

<style>
</style>