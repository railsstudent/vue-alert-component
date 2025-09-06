<script setup lang="ts">
import { capitalize } from '@/capitalize'
import OpenIcon from '@/icons/OpenIcon.vue'
import AlertDropdown from '@/components/AlertDropdown.vue'
import { useNotifications } from '@/composables/useNotification'

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

const { closedNotifications, clearAll, isNonEmpty, remove } = useNotifications()
 
function getBtnClass(type: string) {
  return {
      info: 'btn-info',
      warning: 'btn-warning',
      error: 'btn-error',
      success: 'btn-success'
  }[type]
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
        @click="remove(type)"
      >
        <OpenIcon />{{ capitalize(type) }}
      </button>    
      <button
        v-if="isNonEmpty()"
        class="btn btn-primary" 
        @click="clearAll">
        Open all alerts
      </button>
    </p>
  </div>
</template>
