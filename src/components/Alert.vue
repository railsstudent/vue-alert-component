<script setup lang="ts">
    import { computed, ref } from 'vue'
    import InfoIcon from '@/icons/InfoIcon.vue'
    import WarningIcon from '@/icons/WarningIcon.vue'
    import ErrorIcon from '@/icons/ErrorIcon.vue'
    import SuccessIcon from '@/icons/SuccessIcon.vue'
    import CloseIcon from '@/icons/CloseIcon.vue'
    
    type Props = {
        type: string
        hasCloseButton?: boolean
        style: string
    }

    const { type, hasCloseButton = true, style } = defineProps<Props>()

    const emits = defineEmits<{
        (e: 'closed', type: string): void
    }>()

    const alertColor = computed(() => {
        return {
            info: 'alert-info',
            warning: 'alert-warning',
            error: 'alert-error',
            success: 'alert-success'
        }[type]
    })

    const alertStyle = computed(() => {
        return {
            color: '',
            dash: 'alert-dash',
            soft: 'alert-soft',
            outline: 'alert-outline'
        }[style]
    })

    const alertClasses = computed(() => `alert ${alertColor.value} ${alertStyle.value}`)
    
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

    const closed = ref(false)

    function closeAlert() {
        closed.value = true
        emits('closed', type)
    }
</script>

<template>
  <div role="alert" :class="alertClasses" v-if="!closed">
    <component :is="iconComponent" />
    <span><slot></slot></span>
    <div v-if="hasCloseButton">
        <button class="btn btn-sm btn-primary" alt="Close button" @click="closeAlert">
            <CloseIcon />
        </button>
    </div>
  </div>
</template>
