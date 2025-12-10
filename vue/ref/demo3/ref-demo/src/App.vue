<script setup>
  import { 
    ref,
    onMounted  // 挂在之后
   } from 'vue';  // 响应式API 可以将数据包装成响应式对象
  
  const users = ref([
    
  ]);
  onMounted(() => {
    console.log("页面已经挂在完成");
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => {
        users.value = data;
      })
  })
</script>


<template>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
      </tr>
    </tbody>
  </table>
</template>


<style scoped>

</style>