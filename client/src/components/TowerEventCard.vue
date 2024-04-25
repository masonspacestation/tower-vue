<script setup>
import { computed } from "vue";
import { TowerEvent } from "../models/TowerEvent.js";
import CanceledIndicator from "./CanceledIndicator.vue";
import SoldOutIndicator from "./SoldOutIndicator.vue";

const props = defineProps({ towerEvent: { type: TowerEvent, required: true } })

const bgStyle = computed(() => `url(${props.towerEvent.coverImg})`)


// const filters = [
//   {
//     name: 'all',
//     icon: 'mdi mdi-earth'
//   },
//   {
//     name: 'sport',
//     icon: 'mdi mdi-soccer'
//   },
//   {
//     name: 'convention',
//     icon: `mdi mdi-account-group`
//   },
//   {
//     name: 'digital',
//     icon: 'mdi mdi-laptop'
//   },
//   {
//     name: 'concert',
//     icon: 'mdi mdi-guitar-electric'
//   },
// ]
</script>


<template>
  <RouterLink :to="{ name: 'Event Details', params: { eventId: towerEvent.id } }">
    <section class="mb-4">
      <div class="rounded event-card mb-0 justify-content-between">
        <div class="row m-0 justify-content-end">
          <div class="m-0 p-1 w-auto rounded text-end bg-success"><i class="mdi mdi-soccer"></i></div>
        </div>
        <div class="row justify-content-start align-items-end">
          <!-- <div v-if="towerEvent?.isCanceled == true" class="row justify-content-end align-items-bottom">
            <span class="rounded bg-danger my-2 me-3 px-3 p-1 w-auto fs-6">CANCELED</span> -->
          <CanceledIndicator :towerEvent="towerEvent" />
          <SoldOutIndicator :towerEvent="towerEvent" />
        </div>
      </div>
      <!-- </div> -->
      <h4 class="my-2 fs-5 fw-medium">{{ towerEvent.name }}</h4>
    </section>

  </RouterLink>
</template>


<style lang="scss" scoped>
.event-card {
  height: 15dvh;
  background-image: v-bind(bgStyle);
  background-position: center;
  background-size: cover;
}

h4 {
  text-decoration: none;
}
</style>