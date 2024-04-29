<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";

const props = defineProps({ towerEvent: { type: TowerEvent, required: true } })


// use this to link the component, and have towerEvent computed in the parent
// <CanceledIndicator :towerEvent="towerEvent" />
</script>


<template>

  <small v-if="towerEvent?.isCanceled == true"
    class="rounded bg-danger text-white my-2 me-3 px-3 p-1 w-auto">CANCELED</small>
</template>


<style lang=" scss" scoped></style>