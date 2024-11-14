<script setup>
import '@/assets/styles/auth.css'
import LogoPichau from '@/assets/logo.svg'
import HeaderComponent from '@/components/Auth/HeaderComponent.vue'
</script>

<template>
  <div class="form-page">
    <div class="form-box">
      <HeaderComponent :logo-src="LogoPichau" title="Email enviado" />

      <div class="form-message-box">
        <p class="form-message">
          Enviamos um email para redefinir sua senha, verifique sua caixa de
          entrada e siga as instruções para acessar sua conta novamente.
        </p>
      </div>

      <div class="form-actions">
        <router-link to="/login" class="form-link">Voltar</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-box {
  justify-content: center;
  min-height: 400px;
  padding: 100px;
}

.form-message-box {
  text-align: left;
  color: var(--secondary-text-color);
}
</style>
