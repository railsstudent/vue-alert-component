<script setup lang="ts">
import { ref } from 'vue' 
import Alert from './Alert.vue'

const hasCloseButton = ref(false);

</script>

<template>
  <div>
    <p>
      <span>Has close button? </span>
      <input type="checkbox" v-model="hasCloseButton" />
      </p>
  </div>

  {{ hasCloseButton }}
  <Alert type='info' :hasCloseButton="hasCloseButton">
    New software update available.
  </Alert>
  <Alert type='success' :hasCloseButton="hasCloseButton">
    Your purchase has been confirmed!
  </Alert>
  <Alert type='warning' :hasCloseButton="hasCloseButton">
    Warning: Invalid email address!
  </Alert>
  <Alert type='error' :hasCloseButton="hasCloseButton">
    Error! Task failed successfully.
  </Alert>
</template>
