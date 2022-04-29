<script setup>
import { defineProps } from "vue";

defineProps({
  cardSectionKey: String,
  cardSectionValue: String,
});
</script>
<template>
  <div class="card-section">
    <strong class="card-section__key">{{ cardSectionKey }}: </strong>
    <span class="card-section__value">{{ cardSectionValue }}</span>
  </div>
</template>

<style lang="scss" scoped>
.card-section {
  &__key {
    font-weight: 700;
  }
}
</style>
