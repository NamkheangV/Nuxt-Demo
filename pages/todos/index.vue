<script lang="ts" setup>

interface Todo {
  id: string
  name: string
  status: string
}

const BASE_URL = 'https://665a5f30003609eda45dc10a.mockapi.io'

const statuses = ['active', 'completed']
const todos = ref<Todo[]>([])
const todoText = ref('')

// load todo
const loadTodo = async () => {
  const { data } = await useFetch(`${BASE_URL}/todos`)
  todos.value = data.value as Todo[]
}

// to add todo
const addTodo = async () => {
  try {
    await useFetch(`${BASE_URL}/todos`, {
      method: 'POST',
      body: {
        name: todoText.value,
        status: 'active'
      }
    })

    await loadTodo()
  } catch (error) {
    console.log('error', error);
  }
}

// Update todo
const updateTodo = async (id: string, status: string) => {
  try {
    await useFetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      body: {
        status
      }
    })

    await loadTodo()
  } catch (error) {
    console.log('error', error);
  }
}

// Delete todo
const deleteTodo = async (id: string) => {
  try {
    await useFetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE'
    })

    await loadTodo()
  } catch (error) {
    console.log('error', error);
  }
}

await loadTodo()
</script>

<template>
  <div class="w-full h-screen flex flex-col gap-6 items-center p-6">
    <h1 class="text-3xl font-bold">Todo List</h1>

    <!-- show todoText -->
    <p>{{ todoText }}</p>

    <div class="flex gap-2">
      <input v-model="todoText" type="text" class="rounded-md w-64 border px-2">
      <button @click="addTodo()" class="bg-blue-400 px-6 py-1 rounded-md text-white font-semibold">เพิ่ม</button>
    </div>

    <div class="flex flex-col gap-3">
      <ul v-for="todo in todos" class="flex justify-between min-w-[35rem] p-2 border rounded-md">
        <div class="flex">
          <p class="w-[18rem]">{{ todo.name }}</p>
          <p class="flex items-baseline w-[10rem]">status : 
              <select v-model="todo.status" @change="updateTodo(todo.id, todo.status)">
                <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
              </select>
          </p>
        </div>

        <div  class="flex gap-4 items-baseline">
          <NuxtLink :to="`/todos/${todo.id}`">
            <button>
            <IconPen :size="16" />
              
            </button>
          </NuxtLink>

          <button @click="deleteTodo(todo.id)">
            <IconTrash :size="18" color="red" />
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>

<style></style>