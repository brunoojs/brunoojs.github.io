<script setup>
import '@/assets/styles/auth.css'
import LogoPichau from '@/assets/logo.svg'
import HeaderComponent from '@/components/Auth/HeaderComponent.vue'
import InputGroupComponent from '@/components/Auth/InputGroupComponent.vue'
import ButtonComponent from '@/components/Shared/ButtonComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const recoverPassword = () => {
  router.push('/email-sent')
}
</script>

<template>
  <div class="form-page">
    <div class="form-box">
      <HeaderComponent :logo-src="LogoPichau" title="Recuperar senha" />
      <InputGroupComponent
        id="username"
        label="Email/Usuário"
        placeholder="Digite seu email ou usuário"
        icon-class="fas fa-user"
      />
      <div class="form-actions">
        <ButtonComponent @click="recoverPassword">Confirmar</ButtonComponent>
      </div>
      <div class="form-footer">
        <router-link to="/" class="form-link">Voltar</router-link>
      </div>
    </div>
  </div>
</template>
