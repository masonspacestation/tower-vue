<script setup>

defineProps({ modalId: String })
</script>


<template>
  <!-- Modal trigger button -->
  <!-- <button
    type="button"
    class="btn btn-primary btn-lg"
    data-bs-toggle="modal"
    data-bs-target="#modalId"
  >
    Launch
  </button> -->


  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div class="modal fade" :id="modalId" tabindex="-1" data-bs-keyboard="false" role="dialog"
    aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3>
            Host an event!
          </h3>
        </div>

        <div class="modal-body">
          <slot>
            Swap out modal content
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped></style>