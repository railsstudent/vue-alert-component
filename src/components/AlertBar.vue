<script setup lang="ts">
import { capitalize } from '@/capitalize'
import OpenIcon from '@/icons/OpenIcon.vue'
import AlertDropdown from '@/components/AlertDropdown.vue'

type Props = {
    config: { 
      styleLabel: string
      styles: { text: string, value: string }[]
      directionLabel: string
      directions: { text: string, value: string }[]
    },
}

const props = defineProps<Props>()
const { config } = props

const hasCloseButton = defineModel<boolean>('hasCloseButton', { default: true })
const style = defineModel<string>('style', { default: 'color' })
const direction = defineModel<string>('direction', { default: 'horizontal' })
const closedNotifications = defineModel<string[]>('closedNotifications', { default: [] })

function getBtnClass(type: string) {
  return {
      info: 'btn-info',
      warning: 'btn-warning',
      error: 'btn-error',
      success: 'btn-success'
  }[type]
}

function removeNotification(type: string) {
  closedNotifications.value = closedNotifications.value.filter((t) => t !== type)
}

function clearAllNotifications() {
  closedNotifications.value = []
}

function hasClosedNotifications() {
  return closedNotifications.value.length > 0
}
</script>

<template>
  <div>
    <p class="mb-[0.75rem]">
      <span>Has close button? </span>
      <input type="checkbox" class="mr-[0.5rem]" v-model="hasCloseButton" />
      <AlertDropdown :label="config.styleLabel" :styles="config.styles" v-model:selectedValue="style" />
      <AlertDropdown :label="config.directionLabel" :styles="config.directions" v-model:selectedValue="direction" />
    </p>
    <p class="mb-[0.75rem]">
      <button v-for="type in closedNotifications"
        :key="type"
        class="mr-[0.5rem] btn"
        :class="`${getBtnClass(type)}`"
        @click="removeNotification(type)"
      >
        <OpenIcon />{{ capitalize(type) }}
      </button>    
      <button
        v-if="hasClosedNotifications()"
        class="btn btn-primary" 
        @click="clearAllNotifications">
        Open all alerts
      </button>
    </p>
  </div>
</template>
