<script setup>
import { computed, onMounted, ref } from "vue";
import { towerEventsService } from "../services/TowerEventsService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import ModalWrapper from "../components/ModalWrapper.vue";
import NewEventForm from "../components/NewEventForm.vue";
import TowerEventCard from "../components/TowerEventCard.vue";


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

const towerEvent = computed(() => AppState.towerEvents)

const towerEvents = computed(() => {
  if (filterBy.value == 'all') return AppState.towerEvents
  return AppState.towerEvents.filter(event => event.type == filterBy.value)
})

const filters = [
  {
    name: 'all',
    title: 'All',
    icon: 'earth'
    // icon: 'mdi mdi-earth'
  },
  {
    name: 'sport',
    title: 'Sport',
    icon: 'soccer'
    // icon: 'mdi mdi-soccer'
  },
  {
    name: 'convention',
    title: 'Convention',
    icon: `account-group`
    // icon: `mdi mdi-account-group`
  },
  {
    name: 'digital',
    title: 'Digital',
    icon: 'laptop'
    // icon: 'mdi mdi-laptop'
  },
  {
    name: 'concert',
    title: 'Concert',
    icon: 'guitar-electric'
    // icon: 'mdi mdi-guitar-electric'
  },
]
</script>

<template>
  <section class="container-fluid">
    <div class="row hero-section align-items-end">
      <div class="mb-5 col-12 col-md-6 p-5">
        <h2 class="d-none d-md-block text-white">Event management for people by people</h2>
        <h1 class="d-xs-block d-md-none text-white">Event management for people by people</h1>
        <p class="d-none d-xs-none d-md-block text-white">Whatever your interest, from hiking and reading to
          networking and
          skill sharing,
          there are
          thousands of
          people who share it on Tower. Events are happening every day—log in to join the fun.</p>
      </div>
    </div>

    <section class="container mt-5">
      <h3 class="text-start">How Tower Works</h3>
      <section class="row justify-content-around my-5">
        <div class="col-12 col-md-5 mb-3 p-3 bg-secondary">
          <h5><i class="mdi mdi-dice-multiple-outline text-success me-2 fs-3"></i> Roll the dice</h5>
          <p>Find out about events happening near you.</p>

        </div>
        <div class="col-12 col-md-5 mb-3 p-3 bg-secondary">
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
        <div class="text-center col-8 col-md-2" v-for="filterObj in filters" :key="filterObj.name">
          <div role="button" class="btn btn-secondary w-100 rounded px-0 py-2" @click="filterBy = filterObj.name">
            <div class="d-md-none">
              <i :class="`fs-3 mdi mdi-${filterObj.icon}`"></i><span class="fw-bold ms-3">{{ filterObj.title
                }}</span>
            </div>
            <div class="d-none d-md-block">
              <i :class="`fs-4 mdi mdi-${filterObj.icon}`"></i>
              <h6 class="d-block fw-bold text-center">{{ filterObj.title }}</h6>
            </div>
          </div>
        </div>
        <!-- I wanted to create a 2-column layout at smaller sizes -->
        <!-- <div class="d-md-none col-4" v-for="filterObj in filters" :key="filterObj.type">
          <div class="">{{ filterObj.name }}
          </div> -->
      </div>






      <section class="row">
        <h3 class="text-start mt-5">Upcoming Events <span class="fs-5">({{ AppState.towerEvents.length }})</span></h3>
      </section>
      <section class="row p-md-5">

        <section class="col-6 col-md-4" v-for="towerEvent in towerEvents" :key="towerEvent.id">
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
