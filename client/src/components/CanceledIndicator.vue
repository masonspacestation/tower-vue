<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";

const props = defineProps({ towerEvent: { type: TowerEvent, required: true } })


// use this to link the component, and have towerEvent computed in the parent
// <CanceledIndicator :towerEvent="towerEvent" />
</script>


<template>
  <!-- <div v-if="towerEvent?.isCanceled == true" class="row justify-content-end align-items-bottom">
    <span class="rounded bg-danger my-2 me-3 px-3 p-1 w-auto fs-6">CANCELED</span>
  </div> -->

  <span v-if="towerEvent?.isCanceled == true"
    class="rounded bg-danger text-white my-2 me-3 px-3 p-1 w-auto fs-6">CANCELED</span>

</template>


<style lang="scss" scoped></style>