<script setup>
// Using Composition API with script setup
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/user/123">User</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  padding: 20px;
  background-color: #f0f0f0;
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-active {
  font-weight: bold;
  color: #35495e;
}
</style>
