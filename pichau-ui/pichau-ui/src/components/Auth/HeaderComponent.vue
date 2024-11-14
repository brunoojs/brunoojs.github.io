<template>
  <div class="form-header">
    <img class="form-header__logo" :src="logoSrc" alt="Logo" />
    <h2 class="form-header__title">
      {{ title }}
    </h2>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  logoSrc: String
})
</script>

<style scoped>
.form-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  margin-bottom: 1.8rem;
}

.form-header__logo {
  width: 50px;
}

.form-header__title {
  color: var(--text-color);
  font-size: 54px;
}
</style>
