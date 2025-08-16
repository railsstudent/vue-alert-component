<script setup lang="ts">
import { ref } from 'vue' 
import Alert from './Alert.vue'

const hasCloseButton = ref(true)
const style = ref('');
const alerts = ref([
  { 
    type: 'info',
    message: 'New software update available.'
  }, 
  { 
    type: 'success',
    message: 'Your purchase has been confirmed!'
  }, 
  { 
    type: 'warning',
    message: 'Warning: Invalid email address!'
  }, 
  { 
    type: 'error',
    message: 'Error! Task failed successfully.'
  }])

// const closedNotification = ref<string[]>([])

function handleClosed(type: string) {
  alert(`${type} notification closed`)
}

// function showNotification(type: string) {
//   return !closedNotification.value.includes(type)
// }
</script>

<template>
  <div>
    <p>
      <span>Has close button? </span>
      <input type="checkbox" v-model="hasCloseButton" />
    </p>
    <p>
      <span>Styles: </span>
      <select type="checkbox" v-model="style">
        <option value="color">---</option>
        <option value="soft">Soft</option>
        <option value="outline">Outline</option>
        <option value="dash">Dash</option>
      </select>
    </p>
  </div>

  <Alert v-for="{ type, message } in alerts"
    :key="type"
    :type="type"
    :hasCloseButton="hasCloseButton"
    :style="style"
    @closed="handleClosed">
    {{  message }}
  </Alert>
</template>
