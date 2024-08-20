<script setup>
// import VueDraggable from 'vue-draggable';

const myList = ref([
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' },
    { id: 3, name: 'Test 3' },
])

const BASE_URL = 'https://665a5f30003609eda45dc10a.mockapi.io'

const route = useRoute()
const todoId = route.params.id

const { data: todo } = await useFetch(`${BASE_URL}/todos/${todoId}`)

// const loadTodo = async () => {
//     cosole.log('loadTodo')
//     const { data } = await useFetch(`${BASE_URL}/todos/${todoId}`)
//     todo.value = data.value
// }
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <p>ID : {{ todoId }}</p>
        <p>Name : {{ todo.name }}</p>
        <p>Status : {{ todo.status }}</p>

        <draggable v-model="myList" fallback-tag="ol">
            <div v-for="item in myList" :key="item.id" class="bg-gray-200 p-4 m-2">
                {{ item.name }}
            </div>
        </draggable>
    </div>
</template>
