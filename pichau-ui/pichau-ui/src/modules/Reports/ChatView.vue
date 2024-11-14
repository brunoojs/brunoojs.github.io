<script setup>
import LogoPichau from '@/assets/logo-min.svg'
import ProfilePicture from '@/assets/profile.png'
import { ref, watch, nextTick } from 'vue'
import { getAIResponse } from '@/services/aiService'

const messages = ref([
  {
    text: 'Olá! Sou o assistente da Pichau. Como posso ajudar você hoje?',
    isAI: true,
    timestamp: new Date()
  }
])

const newMessage = ref('')
const messagesContainer = ref(null)
const isLoading = ref(false) 
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

watch(
  messages,
  () => {
    scrollToBottom()
  },
  { deep: true }
)

async function sendMessage() {
  if (!newMessage.value.trim() || isLoading.value) return

  const userMessage = newMessage.value
  messages.value.push({
    text: userMessage,
    isAI: false,
    timestamp: new Date()
  })

  newMessage.value = ''

  isLoading.value = true
  messages.value.push({
    text: '...',
    isAI: true,
    timestamp: new Date(),
    isTyping: true
  })

  try {
    const aiResponse = await getAIResponse(userMessage, messages.value)
    messages.value = messages.value.filter(m => !m.isTyping)
    messages.value.push({
      text: aiResponse,
      isAI: true,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('Error:', error)
    messages.value = messages.value.filter(m => !m.isTyping)
    messages.value.push({
      text: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
      isAI: true,
      timestamp: new Date()
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="app-container">
    <div class="app-content">
      <div class="header">
        <h1>Assistente de Análise - IA</h1>
      </div>
      <div class="divider"></div>
      <div class="chat-container">
        <div class="messages" ref="messagesContainer">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', message.isAI ? 'ai-message' : 'user-message']"
          >
            <div class="message-avatar">
              <img
                :src="message.isAI ? LogoPichau : ProfilePicture"
                :alt="message.isAI ? 'AI Avatar' : 'User Avatar'"
              />
            </div>

            <div class="message-content" :class="{ typing: message.isTyping }">
              <div class="message-text">{{ message.text }}</div>
              <div class="message-time">
                {{ new Date(message.timestamp).toLocaleTimeString() }}
              </div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <div class="input-wrapper">
            <input
              class="input custom-input"
              type="text"
              v-model="newMessage"
              placeholder="Escreva sua mensagem..."
              @keyup.enter="sendMessage"
            />
            <button class="send-button" @click="sendMessage">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 235px);
  margin-top: 20px;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 80%;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.message-avatar img {
  width: 40px;
  height: 40px;
}

.message-content {
  background-color: var(--bg-container-color);
  padding: 12px;
  border-radius: var(--border-radius);
  position: relative;
}

.message-text {
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.5;
}

.message-time {
  font-size: 12px;
  color: var(--light-gray-color);
  margin-top: 4px;
}

.user-message {
  align-self: flex-start;
}

.ai-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.ai-message .message-content {
  background-color: var(--main-color);
  color: white;
}

.ai-message .message-text {
  color: white;
}

.ai-message .message-time {
  color: rgba(255, 255, 255, 0.8);
}

.chat-input {
  padding: 20px;
  background-color: var(--bg-color);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
}

.input-wrapper {
  position: relative;
  width: 80%;
}

.custom-input {
  width: 100%;
  padding: 12px 45px 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: var(--bg-container-color);
}

.custom-input:focus {
  outline: none;
  border-color: var(--main-color);
  box-shadow: 0 0 0 2px rgba(249, 22, 22, 0.1);
}

.send-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--main-color);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.send-button:hover {
  color: var(--main-color-hover);
  transform: translateY(-50%) scale(1.1);
}

.send-button i {
  font-size: 16px;
}

.messages::-webkit-scrollbar {
  width: 6px;
}

.messages::-webkit-scrollbar-track {
  background: var(--bg-container-color);
}

.messages::-webkit-scrollbar-thumb {
  background: var(--light-gray-color);
  border-radius: 3px;
}

.messages::-webkit-scrollbar-thumb:hover {
  background: var(--md-gray);
}

.typing .message-text {
  display: flex;
  align-items: center;
  gap: 4px;
}

.typing .message-text::after {
  content: '';
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
  animation: typing 1s infinite;
}

@keyframes typing {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.custom-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.send-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>


