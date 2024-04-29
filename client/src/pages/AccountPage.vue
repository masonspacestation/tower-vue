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
    const wantsToDestroy = await Pop.confirm('Are you sure you want to delete your ticket to this exclusive event?')
    if (!wantsToDestroy) return

    await ticketsService.deleteTicket(ticketId)
  }
  catch (error) {
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
  <!-- I'd be interested in learning how to make the content here align with the content in the container below, which is not fluid. I want the bg color here to go to the edges though -->
  <div class="container-fluid bg-secondary">
    <div class="row my-4 px-5 py-3">
      <div v-if="account" class="d-flex align-content-center">
        <img class="me-3 rounded" :src="account.picture" alt="" />
        <div class="my-auto">
          <h6 class="mb-0">Welcome</h6>
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
      <div class="row">
        <section v-for="ticket in accountTickets" :key="ticket.id" class="col-6 col-md-4">
          <!-- FIXME reference Mick's album collaborations on his account page for delete -->
          <TowerEventCard :towerEvent="ticket.event" />

          <button @click="deleteTicket(ticket.id)" class="btn btn-outline-danger">Delete Ticket</button>

          <!-- {{ accountTickets. }} -->
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
