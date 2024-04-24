<script setup>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";


const route = useRoute()

async function getTowerEventById() {
  try {
    await towerEventsService.getTowerEventById(route.params.eventId)
  }
  catch (error) {
    Pop.toast('Could not get event by Id', 'error');
  }
}

</script>


<template>
  <div class="container mt-3">
    <section class="row justify-content-center">

      <h3 class="text-start">Event D33ts</h3>


    </section>

  </div>
</template>


<style lang="scss" scoped></style>