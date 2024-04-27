<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Ticket } from "../models/Ticket.js";
import { TowerEvent } from "../models/TowerEvent.js";

// const props = defineProps({ towerEvent: { type: TowerEvent, required: true } })
const props = defineProps({ ticket: { type: Ticket, required: true } })
const account = computed(() => AppState.account)
const tickets = computed(() => AppState.accountTickets)


async function deleteTicket() {

}

</script>


<template>
  <div v-if="ticket.accountId == account.id">
    <button class="btn btn-outline-danger"></button>
  </div>
</template>


<style lang="scss" scoped></style>