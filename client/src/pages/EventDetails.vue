<script setup>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, onBeforeMount, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { ticketsService } from "../services/TicketsService.js";



const route = useRoute()

const towerEvent = computed(() => AppState.activeTowerEvent)
const account = computed(() => AppState.account)
const bgImage = computed(() => `url(${AppState.activeTowerEvent?.coverImg})`)
const tickets = computed(() => AppState.tickets)
const ticketHolder = computed(() => tickets.value.find(ticket => ticket.accountId == AppState.account?.id))
const dateTime = computed(() => AppState.activeTowerEvent.startDate.toDateString())

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
        <!-- SECTION title -->
        <div class="row my-3 px-0 justify-content-start align-items-center">
          <h2 class="w-auto my-2 me-3">{{ towerEvent.name }}</h2>
          <span class="rounded bg-success my-2 me-3 px-3 p-1 w-auto fs-6">{{ towerEvent.type }}</span>
        </div>

        <div v-if="towerEvent.creator.id == account?.id" class="row">
          <div class="col-3">
            <button class="btn w-100 btn-outline-warning" @click="cancelEvent()">Cancel Event</button>
          </div>
          <div class="col-3">
            <button class="btn w-100 btn-outline-danger" @click="deleteEvent()">Delete Event</button>
          </div>
        </div>


        <div class="row px-0 my-3 justify-content-between align-items-start">
          <!-- SECTION col-8 starting with description -->
          <div class="col-8 pe-2">
            <p>{{ towerEvent.description }}</p>
            <div id="event-details" class="mb-5">
              <h5>Event Date</h5>
              <h6><i class="mdi mdi-calendar me-2 text-info fs-4"></i> {{ dateTime }}</h6>
              <h5>Location</h5>
              <h6><i class="mdi mdi-map-marker me-2 text-info fs-4"></i> {{ dateTime }}</h6>
            </div>

            <div class="bg-secondary rounded p-3 text-center mb-3">
              <h5>See what folks are saying. . .</h5>
            </div>


          </div>






          <!-- SECTION col-3 starting with ticket button -->
          <div class="col-4 ps-2">
            <div class="bg-secondary rounded p-3 text-center mb-3">
              <h5>Interested in going?</h5>
              <p>Get a free ticket!</p>
              <button :disabled="ticketHolder != undefined" class="btn w-100 btn-success"
                @click="createTicket()">Attend!</button>
            </div>
            <h6 class="w-100 text-end"><span class="text-success">{{ towerEvent.capacity }}</span> spots left</h6>
            <div>
              <h5>Attendees</h5>
              <div class="bg-secondary rounded p-3 text-center mb-3">

              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- </section> -->
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