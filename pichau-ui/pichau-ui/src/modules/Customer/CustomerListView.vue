<script setup>
import PaginationComponent from '@/components/List/PaginationComponent.vue'
import ButtonComponent from '@/components/Shared/ButtonComponent.vue'
import customersData from '@/data/customers.json'
import { useSearchStore } from '@/stores/searchStore'

import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const customers = ref([])
const currentPage = ref(1)
const itemsPerPage = 7
const totalPages = ref(0)

const router = useRouter()
const searchStore = useSearchStore()

onMounted(() => {
  customers.value = customersData
  totalPages.value = Math.ceil(customers.value.length / itemsPerPage)
})

const filteredCustomers = computed(() => {
  if (!searchStore.searchTerm) {
    return customers.value
  }
  return customers.value.filter(customer => {
    return (
      customer.nome.toLowerCase().includes(searchStore.searchTerm) ||
      customer.empresa.toLowerCase().includes(searchStore.searchTerm) ||
      customer.telefone.toLowerCase().includes(searchStore.searchTerm) ||
      customer.email.toLowerCase().includes(searchStore.searchTerm) ||
      customer.pais.toLowerCase().includes(searchStore.searchTerm) ||
      customer.status.toLowerCase().includes(searchStore.searchTerm)
    )
  })
})

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCustomers.value.slice(start, end)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function addCustomer() {
  router.push({ name: 'AddCustomer' })
}
</script>

<template>
  <div class="app-container">
    <div class="app-content">
      <header class="header">
        <div class="header-title">
          <h1>Todos os clientes</h1>
          <h2 class="subtitle">Clientes</h2>
        </div>
        <ButtonComponent @click="addCustomer">
          Adicionar cliente
        </ButtonComponent>
      </header>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="table-row">
              <th>Nome</th>
              <th>Empresa</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>País</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="customer in paginatedCustomers"
              :key="customer.id"
              class="table-row"
            >
              <td class="table-cell">
                {{ customer.nome }}
              </td>
              <td class="table-cell">
                {{ customer.empresa }}
              </td>
              <td class="table-cell">
                {{ customer.telefone }}
              </td>
              <td class="table-cell">
                {{ customer.email }}
              </td>
              <td class="table-cell">
                {{ customer.pais }}
              </td>
              <td
                :class="[
                  customer.status === 'Ativo'
                    ? 'status-active'
                    : 'status-inactive',
                  'status-tag'
                ]"
              >
                {{ customer.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationComponent
        class="pagination-component"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="goToPage"
      />
    </div>
  </div>
</template>

<style scoped>
.pagination-component {
  align-self: flex-end;
  margin-top: auto;
  margin-bottom: 16px;
}

.table td,
.table th {
  padding: 12px;
  margin: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 16px;
  font-weight: normal;
  color: var(--success-bg-color);
}

@media (min-width: 1200px) {
  .customer-list {
    max-width: 1200px;
  }
}
</style>
