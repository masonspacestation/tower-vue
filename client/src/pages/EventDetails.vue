<!-- eslint-disable no-console -->
<script setup>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, onBeforeMount, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { ticketsService } from "../services/TicketsService.js";
import CanceledIndicator from "../components/CanceledIndicator.vue";
import SoldOutIndicator from "../components/SoldOutIndicator.vue";
import CommentForm from "../components/CommentForm.vue";
import { commentsService } from "../services/CommentsService.js";
import CommentCard from "../components/CommentCard.vue";

const route = useRoute()

const towerEvent = computed(() => AppState.activeTowerEvent)
const account = computed(() => AppState.account)
const bgImage = computed(() => `url(${AppState.activeTowerEvent?.coverImg})`)
const tickets = computed(() => AppState.tickets)
const comments = computed(() => AppState.eventComments)
const ticketHolder = computed(() => tickets.value.find(ticket => ticket.accountId == AppState.account?.id))
const dateTime = computed(() => AppState.activeTowerEvent.startDate.toDateString())
// const myTicket = computed(() => AppState.accountTickets)
const remainingTickets = computed(() => towerEvent.value.capacity - towerEvent.value.ticketCount)

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

// async function deleteTicket(ticketId) {
//   try {
//     const ticketData = await ticketsService.deleteTicket(ticketId)
//   }
//   catch (error) {
//     Pop.toast('Error deleting ticket', 'error');
//   }
// }

async function getTicketHolders() {
  try {
    const eventId = route.params.eventId
    await ticketsService.getTicketHolders(eventId)
  }
  catch (error) {
    Pop.toast('Could not retrieve ticket holders', 'error');
  }
}

async function getEventComments() {
  try {
    const eventId = route.params.eventId
    await commentsService.getEventComments(eventId)
  } catch (error) {
    Pop.toast('Could not get comments for event', 'error')
  }
}

onBeforeMount(() => {
  getTowerEventById()
  getTicketHolders()
  getEventComments()
})


</script>


<template>
  <section v-if="towerEvent">

    <div class="container px-2 px-md-0 mt-3">
      <section class="row justify-content-center">

        <div class="col-10 w-100 rounded cover-img" alt="">
          <CanceledIndicator :towerEvent="towerEvent" />
          <SoldOutIndicator :towerEvent="towerEvent" />
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
          <!-- <div class="col-3">
            <button class="btn w-100 btn-outline-danger" @click="deleteEvent()">Delete Event</button>
          </div> -->
        </div>


        <div class="row px-4 p-md-0 my-3 justify-content-between align-items-start">
          <!-- SECTION col-8 starting with description -->
          <div class="order-2 order-md-1 col-md-8 pe-2">
            <p>{{ towerEvent.description }}</p>
            <div id="event-details" class="mb-5">
              <h5>Event Date</h5>
              <h6><i class="mdi mdi-calendar me-2 text-info fs-4"></i> {{ dateTime }}</h6>
              <h5>Location</h5>
              <h6><i class="mdi mdi-map-marker me-2 text-info fs-4"></i> {{ towerEvent.location }}</h6>
            </div>


            <div class="bg-secondary rounded p-3 text-center mb-3">
              <h5 class="mb-3">See what folks are saying. . .</h5>
              <div class="w-75 m-auto">
                <CommentForm />
              </div>

              <div v-for="comment in comments" :key="comment.id">
                <!-- <div v-for="ticket in tickets" :key="ticket.id"> -->
                <!-- FIXME make sure you are passing a value for your comment prop, and pass down the whole object for it's value -->
                <CommentCard :comment="comment" />
              </div>
            </div>
          </div>



          <!-- SECTION col-3 starting with ticket button -->
          <div class="order-1 order-md-2 col-md-4 ps-2">
            <div v-if="!ticketHolder && !towerEvent.isCanceled && remainingTickets != 0 && account">
              <div class="bg-secondary rounded p-3 text-center mb-3">
                <h5>Interested in going?</h5>
                <p>Get a free ticket!</p>


                <button class="btn w-100 btn-success" @click="createTicket()">Attend!</button>
              </div>
            </div>

            <div v-else-if="ticketHolder && !towerEvent.isCanceled">
              <div class="bg-secondary rounded p-3 text-center mb-3">
                <h5>You're Going!</h5>
                <p>You're on the list, just show up 👌</p>
              </div>
            </div>

            <div v-else-if="!account && !towerEvent.isCanceled && remainingTickets">
              <div class="bg-secondary rounded p-3 text-center mb-3">
                <h5>Want to join?</h5>
                <p>Log in to get a ticket.</p>
              </div>
            </div>

            <div v-else-if="towerEvent.isCanceled">
              <div class="bg-secondary rounded p-3 text-center mb-3">
                <h5>This event has been canceled</h5>
                <p>Womp womp</p>
                <CanceledIndicator :towerEvent="towerEvent" />
              </div>
            </div>

            <div v-else-if="remainingTickets <= 0">
              <div class="bg-secondary rounded p-3 text-center mb-3">
                <h5>This event has sold out!</h5>
                <p>Try to catch it next time.</p>
                <SoldOutIndicator :towerEvent="towerEvent" />
              </div>
            </div>

            <h6 class="w-100 text-end"><span class="text-success">{{ remainingTickets }}</span>
              spots left</h6>
            <div>
              <h5>Attendees</h5>
              <div class="bg-secondary rounded p-3 text-center mb-3">
                <div class="row justify-content-start align-items-center">
                  <div v-for="ticket in tickets" :key="ticket.id">
                    <img :src="ticket.profile.picture" class="ticket-holder-picture" alt="">
                    <span>
                      <p>{{ ticket.profile?.name }}</p>
                    </span>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  </section>

</template>


<style lang="scss" scoped>
.ticket-holder-picture {
  height: 3dvh;
  border-radius: 50em;
  background-position: center;
  background-size: cover;
}

.cover-img {
  height: 25dvh;
  background-image: v-bind(bgImage);
  background-position: center;
  background-size: cover;
}
</style>