<script setup>
import ExitIcon from '@/assets/exit.svg'
import ButtonComponent from '@/components/Shared/ButtonComponent.vue'
import InputGroupComponent from '@/components/Auth/InputGroupComponent.vue'
import customersData from '@/data/customers.json'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref({
  name: '',
  phone: '',
  company: '',
  country: '',
  email: '',
  status: ''
})

const customers = ref(customersData)
const router = useRouter()

const nameRef = ref(null)
const phoneRef = ref(null)
const companyRef = ref(null)
const countryRef = ref(null)
const emailRef = ref(null)
const statusRef = ref(null)

function validateForm() {
  const isNameValid = nameRef.value.validateInput()
  const isPhoneValid = phoneRef.value.validateInput()
  const isCompanyValid = companyRef.value.validateInput()
  const isCountryValid = countryRef.value.validateInput()
  const isEmailValid = emailRef.value.validateInput()
  const isStatusValid = statusRef.value.validateInput()
  return (
    isNameValid &&
    isPhoneValid &&
    isCompanyValid &&
    isCountryValid &&
    isEmailValid &&
    isStatusValid
  )
}

function generateId() {
  if (customers.value.length === 0) {
    return 1
  }
  return Math.max(...customers.value.map(customer => customer.id)) + 1
}

function addCustomer() {
  if (validateForm()) {
    const newCustomerId = generateId()

    const newCustomer = {
      id: newCustomerId,
      nome: user.value.name,
      empresa: user.value.company,
      telefone: user.value.phone,
      email: user.value.email,
      pais: user.value.country,
      status: user.value.status
    }
    customers.value.push(newCustomer)
    alert('Cliente adicionado com sucesso!')
    user.value = {
      name: '',
      phone: '',
      company: '',
      country: '',
      email: '',
      status: ''
    }
  } else {
    alert(
      'Por favor, corrija os erros antes de continuar e preencha todos os campos.'
    )
  }
}

function backToCustomers() {
  router.push({ name: 'Customer' })
}
</script>

<template>
  <div class="app-container">
    <div class="app-content">
      <div class="header">
        <div class="action-back" @click="backToCustomers">
          <img :src="ExitIcon" alt="Sair" class="icon" />
          <span class="action-back-text">Voltar</span>
        </div>
        <h1>Novo Cliente</h1>
      </div>
      <div class="divider" />

      <div class="form">
        <div class="row">
          <InputGroupComponent
            id="nome"
            ref="nameRef"
            v-model="user.name"
            label="Nome"
            placeholder="Digite o nome"
          />

          <InputGroupComponent
            id="username"
            ref="phoneRef"
            v-model="user.phone"
            label="Telefone"
            type="tel"
            placeholder="(47)99999999"
          />
        </div>

        <div class="row">
          <InputGroupComponent
            id="company"
            ref="companyRef"
            v-model="user.company"
            label="Empresa"
            placeholder="Digite a empresa"
          />

          <InputGroupComponent
            id="country"
            ref="countryRef"
            v-model="user.country"
            label="País"
            placeholder="Digite o país"
          />
        </div>

        <div class="row">
          <InputGroupComponent
            id="email"
            ref="emailRef"
            v-model="user.email"
            label="Email"
            type="email"
            placeholder="johndoe@hotmail.com"
          />

          <InputGroupComponent
            id="status"
            ref="statusRef"
            v-model="user.status"
            label="Status"
            type="select"
            :options="['Ativo', 'Inativo']"
          />
        </div>
      </div>
      <div class="divider" />
      <ButtonComponent class="add-button" @click.prevent="addCustomer">
        Adicionar cliente
      </ButtonComponent>
    </div>
  </div>
</template>
<style scoped>
.action-back {
  display: flex;
  align-items: center;
}

.action-back-text {
  color: var(--main-color);
}

.action-back:hover {
  cursor: pointer;
  font-weight: bold;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.divider {
  margin: 16px 0;
}

.row {
  display: flex;
  padding: 16px;
}

.add-button {
  align-self: center;
  width: 200px;
  margin: 16px 0;
}
</style>
