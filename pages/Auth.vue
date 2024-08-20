<script lang="ts" setup>

const formLoginData = reactive({
  username: '',
  password: ''
});

const handleLogin = () => {
  console.log(formLoginData);
}

</script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
    <!-- <div class="bg bg2"></div> -->
    <!-- <div class="bg bg3"></div> -->

    <div class="
    w-[20rem] flex flex-col z-50 items-center gap-4 p-6
    rounded-lg bg-white shadow-xl">
      <p class="text-xl font-bold">WELCOME</p>

      <form action="" @submit="handleLogin" class="w-full flex flex-col gap-4">
        <input type="text" placeholder="Username" class="w-full border mt-4 px-2 py-1 rounded-md">
        <input v-model="formLoginData.username" type="password" placeholder="Password"
          class="w-full border px-2 py-1 rounded-md">

        <button @click="handleLogin"
          class="w-full mt-4 bg-green-500 text-white py-2 rounded-md text-sm font-semibold">LOGIN</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.bg {
  animation: slide 5s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #f1fcff 50%, #cdf3fe 50%);
  bottom: 0;
  left: -50%;
  opacity: .5;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: 1;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 10s;
}

.bg3 {
  animation-duration: 10s;
}

@keyframes slide {
  0% {
    opacity: 1;
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(25%);
  }
}

.gradient {
  background: radial-gradient(58.01% 48.91% at 50.78% 56.83%, #FF3F6D 0%, rgba(255, 63, 109, 0) 100%)
}
</style>