<script setup lang="ts">
import { ref, computed } from 'vue' 
import Alert from './Alert.vue'

const props = defineProps<{
  alerts: { type: string; message: string }[]
}>()

const hasCloseButton = ref(true)
const style = ref('');
const closedNotification = ref<string[]>([])

const alerts = computed(() => props.alerts.filter((alert) => 
  !closedNotification.value.includes(alert.type))
)

function handleClosed(type: string) {
  closedNotification.value.push(type)
}

</script>

<template>
  <div>
    <p>
      <span>Has close button? </span>
      <input type="checkbox" v-model="hasCloseButton" />
    </p>
    <p>
      <span>Styles: </span>
      <select class="select select-info mr-[0.5rem]" v-model="style">
        <option value="color">---</option>
        <option value="soft">Soft</option>
        <option value="outline">Outline</option>
        <option value="dash">Dash</option>
      </select>
      <button
        v-if="closedNotification.length > 0"
        class="btn btn-primary" 
        @click="closedNotification = []">
        Reset Alerts
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
