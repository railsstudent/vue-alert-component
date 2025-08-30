<script setup lang="ts">
import { ref } from 'vue' 
import { capitalize } from '@/capitalize'
import OpenIcon from '@/icons/OpenIcon.vue'

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
</script>

<template>
  <div>
    <p class="mb-[0.75rem]">
      <span>Has close button? </span>
      <input type="checkbox" class="mr-[0.5rem]" v-model="hasCloseButton" />
      <span>{{ config.styleLabel }}&nbsp;&nbsp;</span>
      <select class="select select-info mr-[0.5rem]" v-model="style">
        <option v-for="{value, text} in config.styles" :key="value" :value="value">
          {{ text }}
        </option>
      </select>
      <span>{{ config.directionLabel }}&nbsp;&nbsp;</span>
      <select class="select select-info mr-[0.5rem]" v-model="direction">
        <option v-for="{ value, text } in config.directions" :key="value" :value="value">
          {{ text }}
        </option>
      </select>
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
        v-if="closedNotifications.length > 0"
        class="btn btn-primary" 
        @click="clearAllNotifications">
        Open all alerts
      </button>
    </p>
  </div>
</template>
