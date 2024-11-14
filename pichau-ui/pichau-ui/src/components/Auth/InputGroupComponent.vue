<template>
  <div class="input-group">
    <label :for="id" class="input-group__label">{{ label }}</label>
    <div class="input-group__wrapper">
      <template v-if="type === 'select'">
        <select :id="id" v-model="selectedOption" class="input-group__input">
          <option v-for="option in options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </template>
      <template v-else>
        <input
          :id="id"
          :type="type"
          :class="{ 'invalid-input': !isValid && modelValue }"
          :value="modelValue"
          class="input-group__input"
          :placeholder="placeholder"
          @input="$emit('update:modelValue', $event.target.value),validateInput($event.target.value)"
        />
      </template>

      <i :class="iconClass" aria-hidden="true" />
    </div>
    <p v-if="!isValid && modelValue" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineExpose } from 'vue'

const props = defineProps({
  label: String,
  id: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  iconClass: String,
  modelValue: String,
  options: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const selectedOption = ref(props.modelValue)

const isValid = ref(true)
const errorMessage = ref('')

function validateInput() {
  if (props.type === 'email') {
    return validateEmail(props.modelValue)
  } else if (props.type === 'tel') {
    return validatePhone(props.modelValue)
  }
  return true
}

function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(value)) {
    isValid.value = false
    errorMessage.value = 'Email inválido'
    return false
  } else {
    isValid.value = true
    errorMessage.value = ''
    return true
  }
}

function validatePhone(value) {
  const phonePattern = /^\+?[0-9\s\-()]{10,}$/
  if (!phonePattern.test(value)) {
    isValid.value = false
    errorMessage.value = 'Telefone inválido'
    return false
  } else {
    isValid.value = true
    errorMessage.value = ''
    return true
  }
}

defineExpose({
  validateInput
})

watch(selectedOption, newValue => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped>
.input-group {
  margin-bottom: 18px;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}

.input-group__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group__input {
  width: 100%;
  padding: var(--input-padding);
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 0.4px solid var(--secondary-text-color);
}

.input-group__input.invalid-input {
  border-bottom-color: red;
}

.input-group__input:focus {
  outline: none;
}

.input-group i {
  position: absolute;
  right: 10px;
}

.input-group__label {
  color: var(--secondary-text-color);
}

/* Estilo da mensagem de erro */
.error-message {
  font-size: 12px;
  color: red;
}
</style>
