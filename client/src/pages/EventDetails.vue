<script setup>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, onBeforeMount, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { ticketsService } from "../services/TicketsService.js";


const route = useRoute()

const towerEvent = computed(() => AppState.activeTowerEvent)
const bgImage = computed(() => `url(${AppState.activeTowerEvent?.coverImg})`)
const tickets = computed(() => AppState.tickets)
const ticketHolder = computed(() => tickets.value.find(ticket => ticket.accountId == AppState.account?.id))

async function getTowerEventById() {
  try {
    await towerEventsService.getTowerEventById(route.params.eventId)
  } catch (error) {
    Pop.toast('Could not get event by Id', 'error');
  }
}

async function deleteEvent() {
  try {
    await towerEventsService.deleteEvent(route.params.eventId)
  } catch (error) {
    Pop.toast('Could not delete event', 'error')
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

async function createTicket() {
  try {
    const eventData = { eventId: route.params.eventId }
    await ticketsService.createTicket(eventData)
  } catch (error) {
    Pop.toast('Could not create new ticket', 'error')
    console.error('Error creating ticket', error);
  }
}

onBeforeMount(() => {
  getTowerEventById()
})


</script>


<template>
  <section v-if="towerEvent">

    <div class="container mt-3">
      <section class="row justify-content-center">
        <div class="col-10 w-100 rounded cover-img" alt="">
          <div v-if="towerEvent?.isCanceled == true" class="row justify-content-end align-items-bottom">
            <span class="rounded bg-danger my-2 me-3 px-3 p-1 w-auto fs-6">CANCELED</span>
          </div>
        </div>
        <div class="row px-0 justify-content-start align-items-center">
          <h2 class="w-auto my-2 me-3">{{ towerEvent.name }}</h2>
          <span class="rounded bg-success my-2 me-3 px-3 p-1 w-auto fs-6">{{ towerEvent.type }}</span>
        </div>
        <div class="row px-0 justify-content-between align-items-center">
          <div class="col-3">
            <button class="btn w-100 btn-outline-warning" @click="cancelEvent()">Cancel Event</button>
          </div>
          <div class="col-3">
            <button class="btn w-100 btn-outline-danger" @click="deleteEvent()">Delete Event</button>
          </div>
          <div class="col-3">
            <button :disabled="ticketHolder != undefined" class="btn w-100 btn-outline-danger"
              @click="createTicket()">Join the event!</button>
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