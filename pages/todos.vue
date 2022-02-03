<template>
  <div>
    
    <div v-for="todo in todos" :key="todo.id">
      <div v-if="todo.created">
        <div style="border: solid 1px black; margin: 1rem; padding: 1rem;" v-bind:class="{done: todo.done}">
          <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)">
          <p>{{ todo.name }}</p>
          <p>{{ todo.created.toDate() | dateFilter }}</p>
          <el-button v-on:click="remove(todo.id)" type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </div>
    </div>
    
    <div class="form">
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data: function() {
    return {
      name: '',
      done: false,
    }
  },
  created: function() {
    this.$store.dispatch('todos/init')
  },
  methods: {
    add() {
      this.$store.dispatch('todos/add', this.name)
      this.name = ''
    },
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    },
    toggle(todo) {
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed: {
      todos() {
        // return this.$store.state.todos.todos
        return this.$store.getters['todos/orderdTodos']
      }
  },
  filters: {
    dateFilter: function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>

<style>

.done {
  background-color: darkgray;
}

</style>