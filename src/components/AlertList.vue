<script setup lang="ts">
import { ref, computed } from 'vue' 
import Alert from './Alert.vue'
import AlertBar from './AlertBar.vue'

const props = defineProps<{
  alerts: { type: string; message: string }[]
}>()

const hasCloseButton = ref(true)
const style = ref('color');
const direction = ref('horizontal')
const closedNotifications = ref<string[]>([])

const alertConfig = computed(() => ({
  style: style.value,
  direction: direction.value,
  hasCloseButton: hasCloseButton.value,
}))

const alerts = computed(() => props.alerts.filter((alert) => 
  !closedNotifications.value.includes(alert.type))
)

function handleClosed(type: string) {
  closedNotifications.value.push(type)
}

const config = ref({
  styleLabel: "Alert styles:",
  styles: [
    { text: 'Default', value: 'color' },
    { text: 'Soft', value: 'soft' },
    { text: 'Outline', value: 'outline' },
    { text: 'Dash', value: 'dash' }
  ],
  directionLabel: "Alert direction:",
  directions: [
    { text: 'Horizontal', value: 'horizontal' },
    { text: 'Vertical', value: 'vertical' },
  ]
})
</script>

<template>
  <AlertBar
    :config="config"
    v-model:hasCloseButton="hasCloseButton"
    v-model:style="style"
    v-model:direction="direction"
    v-model:closedNotifications="closedNotifications"
  />

  <Alert v-for="{ type, message } in alerts"
    class="mb-[0.75rem]"
    :key="type"
    :type="type"
    :alertConfig="alertConfig"
    @closed="handleClosed">
    {{  message }}
  </Alert>
</template>
