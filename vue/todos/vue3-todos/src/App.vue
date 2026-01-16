<template>
  <div class="todo-app">
    <h2>{{ title }}</h2>
    
    <input 
      type="text" 
      v-model="newTitle" 
      @keydown.enter="addTodo"
      placeholder="输入任务，按回车添加"
    />
    
    <ul v-if="todos.length">
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
      </li>
    </ul>
    
    <div v-else class="empty">暂无计划</div>
    
    <div class="footer">
      <label>
        全选
        <input type="checkbox" v-model="allDone">
      </label>
      <div>
        {{ active }} / {{ todos.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前编辑中的标题（用于输入框）
const newTitle = ref('')

// 任务列表
const todos = ref([
  { id: 1, title: '打王者', done: false },
  { id: 2, title: '吃饭', done: false },
  { id: 3, title: '睡觉', done: false },
  { id: 4, title: '学习 Vue3', done: false }
])

// 未完成任务数量（计算属性，带缓存）
const active = computed(() => {
  return todos.value.filter(todo => !todo.done).length
})

// 添加任务
const addTodo = () => {
  if (!newTitle.value.trim()) return
  
  todos.value.push({
    id: Date.now(), // 推荐使用时间戳或自增 ID
    title: newTitle.value.trim(),
    done: false
  })
  newTitle.value = ''
}

// 全选 / 全不选（computed 的高级用法：带 getter 和 setter）
const allDone = computed({
  get() {
    return todos.value.length > 0 && todos.value.every(todo => todo.done)
  },
  set(val) {
    todos.value.forEach(todo => {
      todo.done = val
    })
  }
})
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 40px auto;
  font-family: system-ui, sans-serif;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

li input[type="checkbox"] {
  margin-right: 12px;
}

.done {
  color: #999;
  text-decoration: line-through;
}

.empty {
  text-align: center;
  color: #999;
  padding: 40px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
</style>