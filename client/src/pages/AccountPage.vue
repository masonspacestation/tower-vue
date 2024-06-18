<!-- eslint-disable no-console -->
<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";

const account = computed(() => AppState.account)
const accountTickets = computed(() => AppState.accountTickets)
const ticketedEvents = computed(() => accountTickets.value.forEach((ticket) => { AppState.towerEvents.find((towerEvent) => towerEvent.id == ticket.eventId) }))

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
    const wantsToDestroy = await Pop.confirm('Are you sure you want to delete your ticket to this exclusive event?')
    if (!wantsToDestroy) return

    await ticketsService.deleteTicket(ticketId)
  }
  catch (error) {
    Pop.toast('Could not delete your ticket', 'error')
    console.error(error)
  }
}


</script>

<template>
  <div class="container bg-secondary">
    <div class="row my-4 ps-2 py-3">
      <div v-if="account" class="d-flex align-content-center">
        <div class="my-auto">
          <h6 class="mb-0">Welcome,</h6>
          <h1 class="">{{ account.name }}</h1>

        </div>
      </div>
      <div v-else>
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </div>
  </div>
  <div>
    <div class="container">
      <div v-if="accountTickets" class="row mb-2">
        <section v-for="ticket in accountTickets" :key="ticket.id" class="col-6 col-md-4 mb-3">
          <TowerEventCard :towerEvent="ticket.event" />
          <button @click="deleteTicket(ticket.id)" class="btn btn-outline-danger">Delete Ticket</button>
        </section>
      </div>


    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
