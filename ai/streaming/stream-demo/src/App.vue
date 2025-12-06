<script setup>
  // es6 解构
  // vue太复杂，目前只需要 ref
  import { ref } from 'vue'
  // 模板需要消费的数据
  // 响应式数据
  // 在数据改变的时候，模板会自动更新
  // count 是value 为 111 的响应式对象
  let count = ref(111);
  console.log(count);
  setTimeout(() => {
    count.value = 222;
  }, 2000)
</script>

<template>
  <div class="container">
    <div>
      {{ count }}
      <label>输入：</label>
    </div>
  </div>
</template>

<style scoped>

</style>