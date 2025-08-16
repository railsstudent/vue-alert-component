<script setup lang="ts">
import { ref } from 'vue' 
import Alert from './Alert.vue'

const hasCloseButton = ref(true)

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
  </div>

  <Alert
    type='info' :hasCloseButton="hasCloseButton" 
    @closed="handleClosed"
  >
    New software update available.
  </Alert>
  <Alert
    type='success' :hasCloseButton="hasCloseButton" @closed="handleClosed">
    Your purchase has been confirmed!
  </Alert>
  <Alert
    type='warning' :hasCloseButton="hasCloseButton" @closed="handleClosed">
    Warning: Invalid email address!
  </Alert>
  <Alert 
    type='error' :hasCloseButton="hasCloseButton" @closed="handleClosed">
    Error! Task failed successfully.
  </Alert>
</template>
