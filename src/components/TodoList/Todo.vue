<template>
  <li :class="{ completed: todo.done }" class="todo">
    <div class="view">
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo( todo)">
      <label @click="openDialog(todo)" v-text="todo.text"/>
      <button class="destroy" @click="deleteTodo( todo )"/>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo)
    },
    toggleTodo(todo) {
      this.$emit('toggleTodo', todo)
    },
    // 打开待办对话框
    openDialog(todo) {
      this.$emit('openDialog', todo)
      console.log(todo)
    }
  }
}
</script>

<style lang="scss">
  .view {
    label {
      cursor: pointer;
    }
  }
</style>
