<template>
  <div class="about">
    <h1>About Page</h1>
    <p>{{ description }}</p>
    <button @click="updateDescription">Update Description</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const description = ref('This is the about page demonstrating Composition API')

const updateDescription = () => {
  description.value = 'Description updated at ' + new Date().toLocaleTimeString()
}
</script>

<style scoped>
.about {
  padding: 20px;
}

h1 {
  color: #35495e;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #35495e;
}
</style>
