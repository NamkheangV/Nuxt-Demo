<script lang="ts" setup>
  import useColorStore from '@/stores/color'

  const color = useColorStore()
</script>

<template>
  <div class="w-full h-screen flex flex-col gap-2 justify-center items-center">
    <p>Color : {{ color.name }}</p>
    <div
      class="w-20 h-20 rounded-md"
      :style="{ backgroundColor: color.name }"
    ></div>
  </div>
</template>


<style></style>