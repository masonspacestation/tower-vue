<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { Account } from "../models/Account.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";

const route = useRoute()

const props = defineProps({ comment: { type: Comment, required: true } })
const account = computed(() => AppState.account)

async function deleteComment(commentId) {
  try {
    await commentsService.deleteComment(commentId)
  } catch (error) {
    Pop.toast('Could not delete comments', 'error')
  }

}

</script>


<template>
  <div class="card mb-3">
    <section class="container">


      <div class="row justify-content-start align-items-center">
        <div class="col-2">
          <img :src="comment.creator.picture" class="comment-image" alt="">
        </div>
        <div class="col-8 py-3">
          <p class="fw-medium text-start mb-0">
            {{ comment.creator.name }}
          </p>
          <p class="text-start mb-0">
            {{ comment.body }}
          </p>
        </div>
      </div>
      <div v-if="comment.creatorId == account?.id">
        <div class="row text-end align-items-center">
          <small><i @click="deleteComment(comment.id)" class="mdi mdi-delete text-danger opacity-50"></i></small>
        </div>
      </div>



    </section>
  </div>
</template>


<style lang="scss" scoped>
.comment-image {
  height: 5dvh;
  aspect-ratio: 1/1;
  border-radius: 50em;
  background-position: center;
  background-size: cover;
}
</style>