<script setup>
import { computed, onMounted } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";

const towerEvents = computed(() => AppState.towerEvents)

onMounted(() => {
  getEvents()
})


async function getEvents() {
  try {
    await towerEventsService.getEvents()
  }
  catch (error) {
    Pop.toast('Could not get events', 'error');
  }
}
</script>

<template>

  <div class="container mt-3">
    <section class="row p-3">
      <h3 class="text-start">Upcoming Events</h3>

      <section class="col-4" v-for="towerEvent in towerEvents" :key="towerEvent.id">
        <TowerEventCard :towerEvent="towerEvent" />


      </section>
    </section>

  </div>
</template>













<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
