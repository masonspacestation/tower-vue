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
  <section class="container">

    <div class="row justify-content-center g-3 my-3">
      <div class="col-2" v-for="filterObj in filters" :key="filterObj.type">
        <div role="button" class="btn btn-secondary w-100 rounded px-4 py-2" @click="filterBy = filterObj.name">
          <i :class="`${filterObj.icon}`"></i>
          <h5 class="text-center">{{ filterObj.name }}</h5>
        </div>
      </div>
    </div>



    <section class="row">
      <div class="col-3">
        <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal"
          data-bs-target="#create-event-modal">
          New event
        </button>
      </div>
      <!-- <NewEventForm /> -->
    </section>
    <div class="container mt-3">
      <section class="row p-3">
        <h3 class="text-start">Upcoming Events <span class="fs-5">({{ AppState.towerEvents.length }})</span></h3>

        <section class="col-4" v-for="towerEvent in towerEvents" :key="towerEvent.id">
          <TowerEventCard :towerEvent="towerEvent" />


        </section>
      </section>

    </div>
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
