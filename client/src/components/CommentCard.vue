<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";



const props = defineProps({ comment: { type: Comment, required: true } })
// const comment = computed(() => AppState.eventComments)
</script>


<template>
  <div class="card">{{ }}</div>
</template>


<style lang="scss" scoped></style>