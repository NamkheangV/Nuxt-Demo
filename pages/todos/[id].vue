<script setup>
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
    </div>
</template>
