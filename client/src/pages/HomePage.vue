<script setup>
import { computed, onMounted, ref } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import ModalWrapper from "../components/ModalWrapper.vue";
import NewEventForm from "../components/NewEventForm.vue";

// const towerEvents = computed(() => AppState.towerEvents)
const filterBy = ref('all')

onMounted(() => {
  getEvents()
})


async function getEvents() {
  try {
    console.log('getting events');
    await towerEventsService.getEvents()
  }
  catch (error) {
    Pop.toast('Could not get events', 'error');
  }
}



const towerEvents = computed(() => {
  if (filterBy.value == 'all') return AppState.towerEvents
  return AppState.towerEvents.filter(event => event.type == filterBy.value)
})

const filters = [
  {
    name: 'all',
    icon: 'mdi mdi-earth'
  },
  {
    name: 'sport',
    icon: 'mdi mdi-soccer'
  },
  {
    name: 'convention',
    icon: `mdi mdi-account-group`
  },
  {
    name: 'digital',
    icon: 'mdi mdi-laptop'
  },
  {
    name: 'concert',
    icon: 'mdi mdi-guitar-electric'
  },
]
</script>

<template>
  <section class="container-fluid">
    <div class="row hero-section align-items-end">
      <div class="mb-5 col-6 p-5">
        <h2 class="text-white">Event management for people by people</h2>
        <p class="text-white">Whatever your interest, from hiking and reading to networking and skill sharing, there are
          thousands of
          people who share it on Tower. Events are happening every day—log in to join the fun.</p>
      </div>
    </div>

    <section class="container mt-5">
      <h3 class="text-start">How Tower Works</h3>
      <section class="row justify-content-around my-5">
        <div class="col-5 p-3 bg-secondary">
          <h5><i class="mdi mdi-dice-multiple-outline text-success me-2 fs-3"></i> Roll the dice</h5>
          <p>Find out about events happening near you.</p>

        </div>
        <div class="col-5 p-3 bg-secondary">
          <h5><i class="mdi mdi-plus text-success me-2 fs-3"></i> Host an event</h5>
          <p>Meet new folks or invite your fram.</p>
          <button type="button" class="btn btn-font fw-bold text-success" data-bs-toggle="modal"
            data-bs-target="#create-event-modal">
            New event
          </button>
        </div>
        <!-- <NewEventForm /> -->
      </section>




      <h3 class="text-start">Explore top categories</h3>
      <div class="row justify-content-center g-3 my-3">
        <div class="col-2" v-for="filterObj in filters" :key="filterObj.type">
          <div role="button" class="btn btn-secondary w-100 rounded px-4 py-2" @click="filterBy = filterObj.name">
            <i :class="`${filterObj.icon}`"></i>
            <h5 class="text-center">{{ filterObj.name }}</h5>
          </div>
        </div>
      </div>




      <section class="row">
        <h3 class="text-start mt-5">Upcoming Events <span class="fs-5">({{ AppState.towerEvents.length }})</span></h3>
      </section>
      <section class="row p-5">

        <section class="col-4" v-for="towerEvent in towerEvents" :key="towerEvent.id">
          <TowerEventCard :towerEvent="towerEvent" />


        </section>
      </section>


    </section>
    <ModalWrapper modalId="create-event-modal">
      <NewEventForm />
    </ModalWrapper>
  </section>
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

    // >img {
    //   height: 200px;
    //   max-width: 200px;
    //   width: 100%;
    //   object-fit: contain;
    //   object-position: center;
    // }
  }

}

.hero-section {
  height: 60dvh;
  background-image: url("https://images.unsplash.com/photo-1444210971048-6130cf0c46cf?q=80&w=3273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-position: center;
  background-size: cover;
  text-shadow: 0px 0px 10px black;
  filter: contrast(.8);
}
</style>
