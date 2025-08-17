<script setup lang="ts">
    import { computed, ref } from 'vue'
    import CloseIcon from '@/icons/CloseIcon.vue'
    import { capitalize } from '@/capitalize';
    
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
        }[alertConfig.style]
    })

    const alertDirection = computed(() => {
        return {
            horizontal: 'alert-horizontal',
            vertical: 'alert-vertical',
        }[alertConfig.direction]
    })

    const alertClasses = computed(() => `alert ${alertColor.value} ${alertStyle.value} ${alertDirection.value}`)
    const icon = computed(() => `${capitalize(type)}Icon`)

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
