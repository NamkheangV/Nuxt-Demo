<script setup lang="ts">
  import useColorStore from '@/stores/color'
  
  // define the store
  const color = useColorStore()

  const name = ref('')
  // const isUpdated = ref(false)

  const updateColor = () => {
    color.setColor(name.value)

    // isUpdated.value = true

    navigateTo('/showcolor')
  }

  //  watch for changes in the color store
  // watch(name, () => {
  //   isUpdated.value = false
  // })

  // bring the color name from the store to keep the input field updated
  onMounted(() => {
    name.value = color.name
  })
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    
    <div class="flex gap-4">
      <input 
        v-model="name"
        type="text" 
        placeholder="Color Name" 
        class="border px-3 rounded-md"
      />
      
      <button 
        class="text-white bg-red-700 p-2 rounded-md"
        @click="updateColor"
      >
        submit
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>