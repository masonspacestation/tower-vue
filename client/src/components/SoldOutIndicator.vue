<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";

const props = defineProps({ towerEvent: { type: TowerEvent, required: true } })
const remainingTickets = computed(() => props.towerEvent.capacity - props.towerEvent.ticketCount)

// use this to link the component, and have towerEvent computed in the parent
// <CanceledIndicator :towerEvent="towerEvent" />
</script>


<template>
  <small v-if="remainingTickets <= 0" class="rounded bg-info text-white my-2 me-3 px-3 p-1 w-auto">Sold Out</small>
</template>


<style lang="scss" scoped></style>