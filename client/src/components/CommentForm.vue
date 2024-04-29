<script setup>
import { useRoute, useRouter } from "vue-router";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";
import { ref } from "vue";

const route = useRoute()

const liveCommentData = ref({
  body: '',
  eventId: route.params.eventId
})

function resetForm() {
  liveCommentData.value = {
    body: '',
    eventId: route.params.eventId
  }
}


async function createNewComment() {
  try {
    await commentsService.createNewComment(liveCommentData.value)
    resetForm()
  } catch (error) {
    Pop.toast('Could not create your comment', 'error')
  }
}

</script>


<template>
  <div class="row">

    <form @submit.prevent="createNewComment()">
      <div class="row justify-content-end">
        <textarea class="w-100 p-4" v-model="liveCommentData.body" name="" id="" rows="3">Leave a comment</textarea>
        <button class="btn btn-info w-auto my-3 rounded">Comment</button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped></style>