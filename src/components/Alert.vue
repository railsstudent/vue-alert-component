<script setup lang="ts">
    import { computed, ref } from 'vue'
    import CloseIcon from '@/icons/CloseIcon.vue'
    import InfoIcon from '@/icons/InfoIcon.vue'
    import SuccessIcon from '@/icons/SuccessIcon.vue'
    import WarningIcon from '@/icons/WarningIcon.vue'
    import ErrorIcon from '@/icons/ErrorIcon.vue'
    
    type Props = {
        alertConfig: {
            hasCloseButton: boolean
            style: string
            direction: string
        },
        type: string
    }

    const { type, alertConfig } = defineProps<Props>()

    const emits = defineEmits<{
        (e: 'closed', type: string): void
    }>()

    const alertColor = computed(() => ({
            info: 'alert-info',
            warning: 'alert-warning',
            error: 'alert-error',
            success: 'alert-success'
        }[type]))

    const alertStyle = computed(() => ({
            color: '',
            dash: 'alert-dash',
            soft: 'alert-soft',
            outline: 'alert-outline'
        }[alertConfig.style]))

    const alertDirection = computed(() => ({
            horizontal: 'alert-horizontal',
            vertical: 'alert-vertical',
        }[alertConfig.direction]))

    const alertClasses = computed(() => `alert ${alertColor.value} ${alertStyle.value} ${alertDirection.value}`)
    
    const icon = computed(() => ({
            info: InfoIcon,
            warning: WarningIcon,
            error: ErrorIcon,
            success: SuccessIcon,
        }[type]))

    const closed = ref(false)

    function closeAlert() {
        closed.value = true
        emits('closed', type)
    }
</script>

<template>
  <div role="alert" :class="alertClasses" v-if="!closed">
    <component :is="icon" />
    <span><slot></slot></span>
    <div v-if="alertConfig.hasCloseButton">
        <button class="btn btn-sm btn-primary" alt="Close button" @click="closeAlert">
            <CloseIcon />
        </button>
    </div>
  </div>
</template>
