<script setup>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, onBeforeMount, onMounted } from "vue";
import { AppState } from "../AppState.js";


const route = useRoute()

const towerEvent = computed(() => AppState.activeTowerEvent)
const bgImage = computed(() => `url(${AppState.activeTowerEvent?.coverImg})`)

async function getTowerEventById() {
  try {
    await towerEventsService.getTowerEventById(route.params.eventId)
  } catch (error) {
    Pop.toast('Could not get event by Id', 'error');
  }
}


async function cancelEvent() {
  try {
    // const eventId = route.params.eventId
    await towerEventsService.cancelEvent(route.params.eventId)
  } catch (error) {
    Pop.toast('Could not cancel event details', 'error')
  }
}
// async function updateEvent() {
//   try {
//     const eventId = route.params.eventId
//     await towerEventsService.updateEvent(eventId)
//   } catch (error) {
//     Pop.toast('Could not update event details', 'error')
//   }
// }

onBeforeMount(() => {
  getTowerEventById()
})


</script>


<template>
  <section v-if="towerEvent">

    <div class="container mt-3">
      <section class="row justify-content-center">
        <div class="col-10 w-100 rounded cover-img" alt=""></div>
        <div class="row px-0 justify-content-between align-items-center">
          <button @click="cancelEvent()">Cancel Event</button>
          <!-- <button @click="updateEvent()">Update Event</button> -->
          <div>
            <h2 class="w-auto my-2 me-3">{{ towerEvent.name }}</h2>
            <span class="rounded bg-success my-2 px-3 p-1 w-auto fs-6">{{ towerEvent.type }}</span>
          </div>
        </div>
        <p>{{ towerEvent.description }}</p>
      </section>

    </div>
  </section>
</template>


<style lang="scss" scoped>
.cover-img {
  height: 25dvh;
  background-image: v-bind(bgImage);
  background-position: center;
  background-size: cover;
}
</style>