// @/stores/authStore.js
import { defineStore } from 'pinia'
import accounts from '@/data/accounts.json'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('loggedIn'),
    loginError: null,
    registerError: null,
    accounts: [...accounts] 
  }),
  actions: {
    login(username, password) {
      const user = this.accounts.find(account => 
        account.username === username && account.password === password
      )
      
      if (user) {
        localStorage.setItem('loggedIn', true)
        this.isAuthenticated = true
        this.loginError = null
        return true
      } else {
        this.loginError = 'Usuário ou senha incorretos'
        return false
      }
    },
    register(username, email, password) {
      const userExists = accounts.some(account => 
        account.username === username || account.email === email
      )

      if (userExists) {
        this.registerError = 'Usuário ou email já cadastrado'
        return false
      }

      const newUser = {
        id: this.accounts.length + 1,
        username,
        password
      }

      this.accounts.push(newUser)

      this.registerError = null
      return true
    },
    logout() {
      localStorage.removeItem('loggedIn')
      this.isAuthenticated = false
      this.loginError = null
      this.registerError = null
    },
    setError(message) {
          this.registerError = message
        },
    clearErrors() {
      this.loginError = null
      this.registerError = null
    }
  }
})