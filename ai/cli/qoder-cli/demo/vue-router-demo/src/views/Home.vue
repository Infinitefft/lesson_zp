<template>
  <div class="home">
    <h1>Home Page</h1>
    <p>Welcome to Vue Router with Composition API</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const message = ref('This is the home page using script setup')

onMounted(() => {
  console.log('Home component mounted')
})
</script>

<style scoped>
.home {
  padding: 20px;
}

h1 {
  color: #42b983;
}
</style>
