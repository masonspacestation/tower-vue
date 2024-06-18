<!-- eslint-disable no-console -->
<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
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
    await ticketsService.getMyTickets()
  }
  catch (error) {
    Pop.toast('Could not get your events', 'error');
    console.error(error)
  }
}

async function deleteTicket(ticketId) {
  try {
    await ticketsService.deleteTicket(ticketId)
  } catch (error) {
    Pop.toast('Could not delete your ticket', 'error')
    console.error(error)
  }
}

/**
 * async function deleteCollaboration(collaborationId){
  try {
    await collaboratorsService.deleteCollaboration(collaborationId)
  } catch (error) {
    Pop.toast("Could note leave album", 'error')
    console.error(error);
  }
}
 */


</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>

      <div class="container">
        <div class="row mb-2">
          <section v-for="ticket in accountTickets" :key="ticket.id" class="col-6 col-md-4">
            <TowerEventCard :towerEvent="ticket.event" />
            <button @click="deleteTicket(ticket.id)" class="btn btn-outline-danger">Delete Ticket</button>
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
