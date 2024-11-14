<script setup>
import SearchIcon from '@/assets/search.svg'
import NotificationIcon from '@/assets/notification.svg'
import ProfilePicture from '@/assets/profile.png'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/searchStore'

const searchStore = useSearchStore()
const route = useRoute()

function handleSearch(event) {
  const searchTerm = event.target.value
  searchStore.setSearchTerm(searchTerm)
}
</script>

<template>
  <header class="top-bar">
    <div class="search-bar-container">
      <div v-show="route.meta.showSearchBar" class="search-bar">
        <input
          type="text"
          placeholder="Pesquisar..."
          class="search-input"
          @input="handleSearch"
        />
        <img :src="SearchIcon" alt="Pesquisar" class="icon search-icon" />
      </div>
    </div>

    <div class="right-icons">
      <img
        :src="NotificationIcon"
        alt="Notificações"
        class="icon notification-icon"
      />
      <img
        :src="ProfilePicture"
        alt="Perfil do Usuário"
        class="icon profile-picture"
      />
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 70px;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: var(--box-shadow);
}

.search-bar-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding: var(--input-padding);
}

.search-bar {
  position: relative;
}

.search-input {
  padding: 8px;
  padding-right: 40px;
  border-radius: var(--border-radius);
  border: solid 1px var(--border-color);
  width: 600px;
  height: 40px;
  border-radius: 0.8rem;
}

.icon.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
}

.icon.profile-picture {
  width: 40px;
  height: 40px;
}

.right-icons {
  display: flex;
  align-items: center;
}

.icon {
  width: 24px;
}

.notification-icon {
  margin-right: 20px;
}

.profile-picture {
  border-radius: 50%;
}
</style>
