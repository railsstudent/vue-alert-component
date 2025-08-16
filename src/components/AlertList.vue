<script setup lang="ts">
import { ref } from 'vue' 
import Alert from './Alert.vue'

const hasCloseButton = ref(true)
const style = ref('');

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

  <Alert
    type='info' 
    :hasCloseButton="hasCloseButton" 
    :style="style"
    @closed="handleClosed"
  >
    New software update available.
  </Alert>
  <Alert
    type='success' 
    :hasCloseButton="hasCloseButton" 
    :style="style"
    @closed="handleClosed">
    Your purchase has been confirmed!
  </Alert>
  <Alert
    type='warning' 
    :hasCloseButton="hasCloseButton" 
    :style="style"
    @closed="handleClosed">
    Warning: Invalid email address!
  </Alert>
  <Alert 
    type='error' 
    :hasCloseButton="hasCloseButton" 
    :style="style"
    @closed="handleClosed">
    Error! Task failed successfully.
  </Alert>
</template>
