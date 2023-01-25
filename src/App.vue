<script setup lang="ts">
import {calculate_sgp4} from '@/wasm/sgp4Client';

calculate_sgp4({
      epoch: 0,
      xndt2o: 1,
      xndd6o: 2,
      bstar: 3,
      xincl: 4,
      xnodeo: 5,
      eo: 6,
      omegao: 7,
      xmo: 8,
      xno: 9,
      catnr: 10,
      name: "test"
    },
    {
      lat: 0,
      lon: 0,
      alt: 0,
      theta: 0
    },
    123.123).then((look_angle: any) => console.dir(look_angle));

</script>

<template>
  <div>
    Read the developer console for the result of the WASM call.
  </div>
</template>

<style scoped>
</style>
