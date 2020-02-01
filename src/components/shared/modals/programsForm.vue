<template>
    <q-card style="width: 900px; max-width: 90vw;">
      <q-card-section class="row no-wrap">
        <div class="text-h6">
          <slot></slot> Program
        </div>
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          size="md"
          class="text-negative"
          v-close-popup
        />
      </q-card-section>
    </q-card>
</template>

<script>
export default {
}
</script>
