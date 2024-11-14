<script setup>
import LogoPichau from '@/assets/logo.svg'
import HomeIcon from '@/assets/home.svg'
import ReportIcon from '@/assets/report.svg'
import ClientsIcon from '@/assets/search.svg'
import ExitIcon from '@/assets/exit.svg'
import { useAuthStore } from '@/stores/authStore'

import { useRouter } from 'vue-router'

const { logout } = useAuthStore()
const router = useRouter()

const logoutUser = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <img :src="LogoPichau" alt="Logo da Empresa" />
    </div>
    <div class="modules">
      <router-link to="/home" class="module-item" active-class="active-module">
        <img :src="HomeIcon" alt="Página Inicial" class="icon" />
        <span class="module-text">Página Inicial</span>
      </router-link>
      <router-link
        to="/chat"
        class="module-item"
        active-class="active-module"
      >
        <img :src="ReportIcon" alt="Relatórios" class="icon" />
        <span class="module-text">Relatórios</span>
      </router-link>
      <router-link
        to="/customer"
        class="module-item"
        active-class="active-module"
      >
        <img :src="ClientsIcon" alt="Clientes" class="icon" />
        <span class="module-text">Clientes</span>
      </router-link>
    </div>
    <div class="exit" @click="logoutUser">
      <img :src="ExitIcon" alt="Sair" class="icon" />
      <span class="exit-text">Sair</span>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 10%;
  max-width: 225px;
  height: 100vh;
  position: fixed;
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  transition: width 0.3s ease;
}

.logo {
  margin-bottom: 24px;
}

.logo img {
  width: 100%;
}

.modules {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.module-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.3s ease;
}

.module-item:hover {
  color: var(--main-color-hover); 
}

.active-module {
  color: var(--main-color); 
}

.icon {
  width: 36px;
}

.module-text,
.exit-text {
  font-size: 12px;
}

.exit {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--main-color);
  margin-top: auto;
  margin-bottom: 16px;
}
.exit .icon {
  width: 48px;
}
</style>
