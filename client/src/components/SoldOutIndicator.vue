<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";

const props = defineProps({ towerEvent: { type: TowerEvent, required: true } })
// const activeEvent = computed(() => AppState.activeTowerEvent)
const remainingTickets = computed(() => props.towerEvent.capacity - props.towerEvent.ticketCount)

// use this to link the component, and have towerEvent computed in the parent
// <CanceledIndicator :towerEvent="towerEvent" />
</script>


<template>
  <div v-if="remainingTickets <= 0" class="row justify-content-end align-items-bottom">
    <span class="rounded bg-info my-2 me-3 px-3 p-1 w-auto fs-6">Sold Out</span>
  </div>
</template>


<style lang="scss" scoped></style>