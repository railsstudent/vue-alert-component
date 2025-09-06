<script setup lang="ts">

type Props = {
    label: string
    items: { value: string, text: string }[]
}

const { label, items } = defineProps<Props>()
const selectedValue = defineModel<string>('selectedValue')

</script>

<template>
    <span>{{ label }}&nbsp;&nbsp;</span>
    <select class="select select-info mr-[0.5rem]" v-model="selectedValue">
        <option v-for="{value, text} in items" :key="value" :value="value">
            {{ text }}
        </option>
    </select>
</template>
