<script setup>
defineProps({
  onClick: Function
})
</script>

<template>
  <button class="button" @click="onClick">
    <slot />
  </button>
</template>

<style scoped>
.button {
  background-color: var(--main-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: var(--main-color-hover);
}
</style>
