<script setup>
import PaginationComponent from '@/components/List/PaginationComponent.vue'
import ButtonComponent from '@/components/Shared/ButtonComponent.vue'
import transactionsData from '@/data/transactions.json'
import customersData from '@/data/customers.json'
import { useSearchStore } from '@/stores/searchStore'
import { importCSV, generateCSVTemplate } from '@/utils/csvImporter'

import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const transactions = ref([])
const customers = ref([]) 
const currentPage = ref(1)
const itemsPerPage = 7
const totalPages = ref(0)

const router = useRouter()

const searchStore = useSearchStore()

onMounted(() => {
  transactions.value = transactionsData
  customers.value = customersData
  totalPages.value = Math.ceil(transactions.value.length / itemsPerPage)
})

const getCustomerName = (clienteId) => {
  const customer = customers.value.find(c => c.id === clienteId)
  return customer ? customer.nome : 'Cliente não encontrado'
}

const filteredTransactions = computed(() => {
  if (!searchStore.searchTerm) {
    return transactions.value
  }
  return transactions.value.filter(transaction => {
    const customerName = getCustomerName(transaction.cliente_id).toLowerCase()
    return (
      customerName.includes(searchStore.searchTerm) ||
      transaction.descricao.toLowerCase().includes(searchStore.searchTerm) ||
      transaction.valor.toString().includes(searchStore.searchTerm) ||
      transaction.data.toLowerCase().includes(searchStore.searchTerm) ||
      transaction.status.toLowerCase().includes(searchStore.searchTerm) ||
      transaction.tipo.toLowerCase().includes(searchStore.searchTerm)
    )
  })
})

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTransactions.value.slice(start, end)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleImportCSV = () => {
  const config = {
    headers: ['cliente_id', 'valor', 'data', 'descricao', 'status', 'tipo'],
    
    validations: {
      cliente_id: (value) => customers.value.some(c => c.id === parseInt(value)),
      status: (value) => ['Realizado', 'Pendente', 'Cancelado'].includes(value),
      tipo: (value) => ['Entrada', 'Saída'].includes(value),
      valor: (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
      data: (value) => /^\d{2}\/\d{2}\/\d{4}$/.test(value)
    },
    
    transformData: (row) => ({
      id: transactions.value.length + 1,
      cliente_id: parseInt(row.cliente_id),
      valor: parseFloat(row.valor),
      data: row.data,
      descricao: row.descricao,
      status: row.status,
      tipo: row.tipo
    }),
    
    onSuccess: (data) => {
      transactions.value = [...transactions.value, ...data]
      totalPages.value = Math.ceil(transactions.value.length / itemsPerPage)
      alert(`${data.length} transações importadas com sucesso!`)
    },
    
    onError: (error) => {
      alert(`Erro ao importar CSV: ${error}`)
    }
  }
  importCSV(config)
}

const handleDownloadTemplate = () => {
  const headers = ['cliente_id', 'valor', 'data', 'descricao', 'status', 'tipo']
  const exampleRow = '1,1500.00,29/08/2024,Notebook Gamer,Realizado,Entrada'
  generateCSVTemplate(headers, exampleRow)
}

function goToChat() {
  router.push({ name: 'Chat' })
}

</script>

<template>
  <div class="app-container home-list">
    <div class="app-content">
      <header class="header">
        <div class="header-title">
          <h1>Todas as transações</h1>
          <h2 class="subtitle">Transações</h2>
        </div>
        <div class="header-actions">
            <ButtonComponent @click="handleImportCSV">
            Importar CSV
          </ButtonComponent>
          <ButtonComponent @click="handleDownloadTemplate">
            Exportar template CSV
          </ButtonComponent>
        </div>

      </header>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="table-row">
              <th>Cliente</th> 
              <th>Valor</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in paginatedTransactions"
              :key="transaction.id"
              class="table-row"
            >
              <td class="table-cell">
                {{ getCustomerName(transaction.cliente_id) }}
              </td>
              <td class="table-cell">
                R${{
                  transaction.valor.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                  })
                }}
              </td>
              <td class="table-cell">
                {{ transaction.data }}
              </td>
              <td class="table-cell">
                {{ transaction.descricao }}
              </td>
              <td class="status-tag">
                <span
                  :class="[
                    {
                      'status-realizado': transaction.status === 'Realizado',
                      'status-pendente': transaction.status === 'Pendente',
                      'status-cancelado': transaction.status === 'Cancelado'
                    }
                  ]"
                >
                  {{ transaction.status }}
                </span>
              </td>
              <td class="status-tag">
                <span
                  :class="[
                    {
                      'tipo-entrada': transaction.tipo === 'Entrada',
                      'tipo-saida': transaction.tipo === 'Saída'
                    }
                  ]"
                >
                  {{ transaction.tipo }}
                </span>
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

.header .header-actions {
  display: flex;
  gap: 8px;
}

.header .header-actions button {
  width: 100px;
  height: 46px;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.subtitle {
  font-size: 16px;
  font-weight: normal;
  color: var(--success-bg-color);
}

.status-realizado {
  background-color: var(--success-bg-color);
  color: var(--success-text-color);
  border: solid 1px var(--success-border-color);
}

.status-pendente {
  background-color: #fff3cd;
  color: #856404;
  border: solid 1px #856404;
}

.status-cancelado {
  background-color: var(--danger-bg-color);
  color: var(--danger-text-color);
  border: solid 1px var(--danger-border-color);
}

.tipo-entrada {
  background-color: var(--success-bg-color);
  color: var(--success-text-color);
  border: solid 1px var(--success-border-color);
}

.tipo-saida {
  background-color: var(--danger-bg-color);
  color: var(--danger-text-color);
  border: solid 1px var(--danger-border-color);
}

.home-list .status-tag {
  font-weight: bold;
  display: table-cell ;
}

.home-list .status-tag span {
  display: flex;
  width: 50px;
  height: 30px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  width: 100px;
}

@media (min-width: 1200px) {
  .customer-list {
    max-width: 1200px;
  }
}
</style>
