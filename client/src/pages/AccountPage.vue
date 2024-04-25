<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";

// const towerEvent = computed(() => AppState.towerEvents)
const account = computed(() => AppState.account)
const accountTickets = computed(() => AppState.accountTickets)

onMounted(() =>
  getMyEvents()
)

async function getMyEvents() {
  try {
    const myEvents = await ticketsService.getMyTickets()
  }
  catch (error) {
    Pop.toast('Could not get your events', 'error');
  }
}


</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>

      <div class="container">
        <div class="row">
          <section v-for="ticket in accountTickets" :key="ticket.id" class="col-4">
            <TowerEventCard :towerEvent="ticket.event" />
            <!-- {{ accountTickets. }} -->
          </section>
        </div>
      </div>
    </div>


    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
