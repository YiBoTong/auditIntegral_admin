<template>
  <div>
    <section v-if="showTodos" class="todoapp">
      <!-- header -->
      <header class="header">
        <div class="add-button" @click="handleAdd">
          <el-button type="primary" icon="el-icon-plus" circle/>
        </div>
        <input class="new-todo" autocomplete="off" placeholder="添加待办" @keyup.enter="addTodo">
      </header>
      <!-- main section -->
      <section v-if="todos.length" class="main">
        <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
        <!--<label for="toggle-all"/>-->
        <ul class="todo-list">
          <todo
            v-for="(todo, index) in filteredTodos"
            :key="index"
            :todo="todo"
            @toggleTodo="toggleTodo"
            @editTodo="editTodo"
            @deleteTodo="deleteTodo"
            @openDialog="handleOpen"/>
        </ul>
      </section>
      <!-- footer -->
      <footer v-show="todos.length" class="footer">
        <span class="todo-count">
          <strong>{{ remaining }}</strong>条
          {{ remaining | pluralize('item') }} left
        </span>
        <ul class="filters">
          <li v-for="(val, key) in filters" :key="key">
            <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
          </li>
        </ul>
        <!--<button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">-->
        <!--Clear completed-->
        <!--</button>-->
      </footer>
    </section>
    <!--添加待办-->
    <section v-else>
      <add-todo @handleClick="handleData"/>
    </section>
    <todo-dialog :visible.sync="visible" :title="title" :width="width"/>
  </div>
</template>

<script>
import AddTodo from './AddTodo'
import Todo from './Todo.vue'
import TodoDialog from './TodoDialog'

const STORAGE_KEY = 'todos'
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]
export default {
  components: { TodoDialog, AddTodo, Todo },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    // capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    capitalize: v => {
      const change = {
        all: '全部待办',
        active: '未完成待办',
        completed: '已完成待办'
      }
      return change[v] || v
    }
  },
  data() {
    return {
      visibility: 'all',
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: defalutList,
      showTodos: true,
      visible: false,
      width: '',
      title: ''
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setLocalStorage()
      }
      e.target.value = ''
    },
    toggleTodo(val) {
      val.done = !val.done
      this.setLocalStorage()
    },
    deleteTodo(todo) {
      this.$confirm('确定删除此条待办？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.todos.splice(this.todos.indexOf(todo), 1)
        this.setLocalStorage()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorage()
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorage()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorage()
      })
    },
    // 添加待办
    handleAdd() {
      this.showTodos = false
    },
    //  处理添加待办的子组件传递的数据
    handleData(value) {
      this.showTodos = true
      if (value) {
        console.log(value)
      } else return
    },
    // 打开对话框
    handleOpen(value) {
      this.visible = true
      this.width = '600px'
      this.title = '查看待办'
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
