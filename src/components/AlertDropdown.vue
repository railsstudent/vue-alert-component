<script setup lang="ts">

type Props = {
    label: string
    styles: { value: string, text: string }[]
}

const { label, styles } = defineProps<Props>()
const selectedValue = defineModel<string>('selectedValue')

</script>

<template>
    <span>{{ label }}&nbsp;&nbsp;</span>
    <select class="select select-info mr-[0.5rem]" v-model="selectedValue">
        <option v-for="{value, text} in styles" :key="value" :value="value">
            {{ text }}
        </option>
    </select>
</template>
