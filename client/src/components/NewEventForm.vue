<script setup>
import { ref } from "vue";


const liveEventData = ref({
  name: '',
  startDate: '',
  location: '',
  description: '',
  coverImg: '',
  type: '',
  capacity: '',
})

function resetForm() {
  liveEventData.value = {
    name: '',
    startDate: '',
    location: '',
    description: '',
    coverImg: '',
    type: '',
    capacity: '',
  }
}

</script>


<template>
  <div class="container">
    <div class="form" @submit.prevent="createNewEvent()">
      <div class="row">

        <div class="col-4">
          <label for="event-name"></label>
          <input v-model="liveEventData.name" type="text" minlength="3" maxlength="50" name="event-name" id="event-name"
            class="form-control" placeholder="Event Name" required>
        </div>

        <div class="col-4">
          <label for="event-date"></label>
          <input v-model="liveEventData.startDate" type="date" name="event-date" id="event-date" class="form-control"
            required>
        </div>

        <div class="col-4">
          <label for="event-location"></label>
          <input v-model="liveEventData.location" type="text" minlength="1" maxlength="500" name="event-location"
            id="event-location" class="form-control" placeholder="Event Location" required>
        </div>

        <div class="col-4">
          <label for="event-type"></label>
          <input v-model="liveEventData.type" type="text" name="event-type" id="event-type" class="form-control"
            placeholder="Event Type" required>
        </div>

        <div class="col-4">
          <label for="event-capacity"></label>
          <input v-model="liveEventData.capacity" type="number" min="3" max="5000" name="event-capacity"
            id="event-capacity" class="form-control" placeholder="Event Capacity" required>
        </div>

        <div class="col-4">
          <label for="event-coverImg"></label>
          <input v-model="liveEventData.coverImg" type="url" name="event-coverImg" id="event-coverImg"
            class="form-control" placeholder="Cover Image Url" required>
        </div>

        <div class="col-12">
          <label for="event-description"></label>

          <textarea v-model="liveEventData.description" rows="5" type="text" min="15" max="1000"
            name="event-description" id="event-description" class="form-control" placeholder="Event Description"
            required>
          </textarea>
        </div>




      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>