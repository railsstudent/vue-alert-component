<script setup lang="ts">
    import { computed } from 'vue'
    import InfoIcon from '@/icons/InfoIcon.vue'
    import WarningIcon from '@/icons/WarningIcon.vue'
    import ErrorIcon from '@/icons/ErrorIcon.vue'
    import SuccessIcon from '@/icons/SuccessIcon.vue'
    import CloseIcon from '@/icons/CloseIcon.vue'
    
    type Props = {
        type?: string
        hasCloseButton?: boolean
    }

    const { type = 'info', hasCloseButton = true } = defineProps<Props>()

    const alertType = computed(() => {
        return {
            info: 'alert-info',
            warning: 'alert-warning',
            error: 'alert-error',
            success: 'alert-success'
        }[type]
    })

    const alertClasses = computed(() => `alert ${alertType.value || 'alert-info'}`)
    
    const iconComponent = computed(() => {
        switch (type) {
            case 'info':
                return InfoIcon
            case 'success':
                return SuccessIcon
            case 'warning':
                return WarningIcon
            case 'error':
                return ErrorIcon
            default:
                return InfoIcon
        }
    })
</script>

<template>
  <div role="alert" :class="alertClasses">
    <component :is="iconComponent" />
    <span><slot></slot></span>
    <div v-if="hasCloseButton">
        <button class="btn btn-sm btn-primary" alt="Close button">
            <CloseIcon />
        </button>
    </div>
  </div>
</template>
