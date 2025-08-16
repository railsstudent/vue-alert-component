<script setup lang="ts">
import { ref } from 'vue'
import AlertList from './components/AlertList.vue'

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
</script>

<template>
  <main>
    <AlertList :alerts="alerts" />
  </main>
</template>
