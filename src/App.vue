<script setup lang="ts">
import { ref } from 'vue';
import { ALERTS } from './app-const';
import AlertList from './components/AlertList.vue';

const alerts = ref(ALERTS)
</script>

<template>
  <main>
    <AlertList :alerts="alerts" />
  </main>
</template>
