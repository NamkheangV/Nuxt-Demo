<script setup lang="ts">
const sortDate = [
    {
        label: "asc",
        icon: "ion:binoculars-outline"
    },
    {
        label: "desc",
        icon: "ion:binoculars-outline"
    },
]

const sort = ref<string>(sortDate[0].label)
</script>

<template>
    <div>
        Hello World

        <Demo :list="sortDate" v-model:sort="sort" />
r
        <br />
        <br />
        <br />
        <br />
        {{ sort }}
    </div>
</template>

<style scoped>

</style>