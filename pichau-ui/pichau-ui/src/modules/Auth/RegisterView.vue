<!-- RegisterView.vue -->
<script setup>
import '@/assets/styles/auth.css'
import LogoPichau from '@/assets/logo.svg'
import HeaderComponent from '@/components/Auth/HeaderComponent.vue'
import InputGroupComponent from '@/components/Auth/InputGroupComponent.vue'
import ButtonComponent from '@/components/Shared/ButtonComponent.vue'
import { useAuthStore } from '@/stores/authStore'

import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const usernameRef = ref(null)
const emailRef = ref(null)
const passwordRef = ref(null)
const confirmPasswordRef = ref(null)

const isPasswordStrong = computed(() => {
  return password.value.length >= 6 && /[0-9]/.test(password.value)
})

const doPasswordsMatch = computed(() => {
  return password.value === confirmPassword.value
})

function register() {
  const isUsernameValid = username.value.length >= 3
  const isEmailValid = emailRef.value?.validateInput()
  const isPasswordValid = isPasswordStrong.value
  const isConfirmPasswordValid = doPasswordsMatch.value

  if (!isUsernameValid) {
    authStore.setError('Username deve ter pelo menos 3 caracteres')
    return
  }

  if (!isEmailValid) {
    authStore.setError('Email inválido')
    return
  }

  if (!isPasswordValid) {
    authStore.setError('A senha deve ter pelo menos 6 caracteres e conter pelo menos 1 número')
    return
  }

  if (!isConfirmPasswordValid) {
    authStore.setError('As senhas não coincidem')
    return
  }

  if (authStore.register(username.value, email.value, password.value)) {
    router.push({ name: 'Login' })
  }
}
</script>

<template>
  <div class="form-page">
    <div class="form-box">
      <HeaderComponent :logo-src="LogoPichau" title="Criar Conta" />
      <div class="input-group-custom">
        <InputGroupComponent
        id="username"
        ref="usernameRef"
        v-model="username"
        label="Usuário"
        placeholder="Digite seu usuário"
        icon-class="fas fa-user"
      />

      <InputGroupComponent
        id="email"
        ref="emailRef"
        v-model="email"
        type="email"
        label="Email"
        placeholder="Digite seu email"
        icon-class="fas fa-envelope"
      />
      </div>
      

      <div class="input-group-custom">
        <InputGroupComponent
        id="password"
        ref="passwordRef"
        v-model="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        icon-class="fas fa-lock"
      />

      <InputGroupComponent
        id="confirm-password"
        ref="confirmPasswordRef"
        v-model="confirmPassword"
        type="password"
        label="Confirmar Senha"
        placeholder="Confirme sua senha"
        icon-class="fas fa-lock"
      />
      </div>

      <div class="password-requirements" :class="{ 'requirements-met': isPasswordStrong }">
        <p>A senha deve conter:</p>
        <ul>
          <li>Mínimo 6 caracteres</li>
          <li>Pelo menos um número</li>
        </ul>
      </div>


      <div v-if="!doPasswordsMatch && confirmPassword" class="error-message">
        As senhas não coincidem
      </div>

      <div v-if="authStore.registerError" class="error-message">
        {{ authStore.registerError }}
      </div>

      <div class="form-actions">
        <ButtonComponent @click="register">Criar Conta</ButtonComponent>
      </div>

      <div class="form-footer">
        <span>Já tem uma conta?</span>
        <router-link to="/login" class="form-link">Faça login</router-link>
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

.password-requirements {
  font-size: 12px;
  color: var(--secondary-text-color);
  margin: 10px 0;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.password-requirements.requirements-met {
  border-color: var(--success-border-color);
  color: var(--success-text-color);
}

.password-requirements ul {
  list-style: none;
  padding-left: 15px;
  margin-top: 5px;
}

.password-requirements li {
  margin: 3px 0;
}

.password-requirements li::before {
  content: "•";
  margin-right: 5px;
}

.form-box {
  max-width: 700px;
}

.input-group-custom {
  display: flex;
  gap: 8px;
  width: 100%;
}
</style>