<script setup>
import { computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})

const emit = defineEmits(['page-change'])

function changePage(page) {
  emit('page-change', page)
}

const pageNumbers = computed(() => {
  return Array.from({ length: props.totalPages }, (_, i) => i + 1)
})
</script>

<template>
  <div class="pagination">
    <button
      v-for="page in pageNumbers"
      :key="page"
      :class="{ 'active-page': page === props.currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<style scoped>
.pagination button {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 14px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination .active-page {
  font-weight: bold;
  color: var(--main-color);
}
</style>
