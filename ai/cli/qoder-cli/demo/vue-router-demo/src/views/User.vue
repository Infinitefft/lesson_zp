<template>
  <div class="user">
    <h1>User Profile</h1>
    <p>User ID: {{ userId }}</p>
    <p>Route params: {{ route.params }}</p>
    <button @click="goToHome">Go to Home</button>
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const userId = computed(() => route.params.id)

const goToHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.user {
  padding: 20px;
}

h1 {
  color: #646cff;
}

button {
  margin: 10px 10px 0 0;
  padding: 8px 16px;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #535bf2;
}
</style>
