<script setup>
import '@/assets/styles/auth.css'
import HeaderComponent from '@/components/Auth/HeaderComponent.vue'
import InputGroupComponent from '@/components/Auth/InputGroupComponent.vue'
import ButtonComponent from '@/components/Shared/ButtonComponent.vue'
import { useAuthStore } from '@/stores/authStore'
import LogoPichau from '@/assets/logo.svg'

import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')

function login() {
  if (authStore.login(username.value, password.value)) {
    router.push({ name: 'Home' })
  }
}

function goToRegister() {
  router.push({ name: 'Register' })
}

watch([username, password], () => {
  authStore.clearErrors()
})
</script>

<template>
  <div class="form-page">
    <div class="form-box">
      <HeaderComponent :logo-src="LogoPichau" title="Entrar" />
      <InputGroupComponent
        id="username"
        v-model="username"
        label="Usuário"
        placeholder="Digite seu usuário"
        icon-class="fas fa-user"
      />
      <InputGroupComponent
        id="password"
        v-model="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        icon-class="fas fa-lock"
      />
      <div v-if="authStore.loginError" class="error-message">
        {{ authStore.loginError }}
      </div>
      <div class="form-actions">
        <ButtonComponent @click="login">Entrar</ButtonComponent>
        <router-link to="/forgot-password" class="form-link">
          Esqueceu sua senha?
        </router-link>
      </div>
      <div class="form-footer">
        <span>Não tem uma conta?</span>
        <a href="#" class="form-link" @click="goToRegister">Registre-se</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: var(--danger-text-color);
  background-color: var(--danger-bg-color);
  border: 1px solid var(--danger-border-color);
  padding: 10px;
  border-radius: var(--border-radius);
  margin-bottom: 15px;
  text-align: center;
}
</style>