<script setup lang="ts">
export interface SortList {
    label: string;
    icon: string;
}

interface DemoProps {
    list?: SortList[];
}

defineProps<DemoProps>();

const emits = defineEmits<{
    "update:sort": [value: string]
}>();

const onClickSelectSortMenu = (data: string) => {
    emits('update:sort', data)
}

</script>

<template>
    <div>
        Demo Component

        <div v-for="item of list">
            {{item.label}}
            <Icon :name="item.icon" />
        </div>
    </div>
</template>

<style scoped>

</style>