<script setup lang="ts">
import { ref, computed } from 'vue' 
import Alert from './Alert.vue'
import { capitalize } from '@/capitalize'
import OpenIcon from '@/icons/OpenIcon.vue'

const props = defineProps<{
  alerts: { type: string; message: string }[]
}>()

const hasCloseButton = ref(true)
const style = ref('');
const closedNotification = ref<string[]>([])

const alerts = computed(() => props.alerts.filter((alert) => 
  !closedNotification.value.includes(alert.type))
)

function getBtnClass(type: string) {
  return {
      info: 'btn-info',
      warning: 'btn-warning',
      error: 'btn-error',
      success: 'btn-success'
  }[type]
}

function handleClosed(type: string) {
  closedNotification.value.push(type)
}

function removeNotification(type: string) {
  closedNotification.value = closedNotification.value.filter((t) => t !== type)
}
</script>

<template>
  <div>
    <p>
      <span>Has close button? </span>
      <input type="checkbox" v-model="hasCloseButton" />
    </p>
    <p class="mb-[0.75rem]">
      <span>Styles: </span>
      <select class="select select-info mr-[0.5rem]" v-model="style">
        <option value="color">---</option>
        <option value="soft">Soft</option>
        <option value="outline">Outline</option>
        <option value="dash">Dash</option>
      </select>
    </p>
    <p class="mb-[0.75rem]">
      <button
        v-for="type in closedNotification"
        :key="type"
        class="mr-[0.5rem] btn"
        :class="`${getBtnClass(type)}`"
        @click="removeNotification(type)"
      >
        <OpenIcon />{{ capitalize(type) }}
      </button>      
      <button
        v-if="closedNotification.length > 0"
        class="btn btn-primary" 
        @click="closedNotification = []">
        Open all alerts
      </button>
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
