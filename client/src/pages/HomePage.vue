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
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">

    <div class="container">
      <section class="row p-3">
        <h3 class="text-start">Upcoming Events</h3>
        <section v-for="towerEvent in towerEvents" :key="towerEvent.id">
          <TowerEventCard />
          <!-- <div class="col-4">
    <div class="card text-start">
      <img class=""
      src="https://images.unsplash.com/photo-1565733362858-3c610e8044cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25vd2JvYXJkaW5nfGVufDB8fDB8fHww"
      alt="">
      <h4>Let's Shred</h4>
    </div>
  </div> -->



        </section>
      </section>
    </div>

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
