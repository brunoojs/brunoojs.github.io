<script setup>
import Sidebar from '@/components/Shared/Sidebar.vue'
import Topbar from '@/components/Shared/Topbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="main-layout">
    <Topbar />
    <Sidebar />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
}

.content {
  width: 100vw; 
  padding: 20px;
  background-color: #f9f9f9;
  padding-left: 160px; 
  height: 100vh;
  padding-top: 100px; 
}
</style>
