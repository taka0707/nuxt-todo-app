<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form v-on:submit.prevent="add">
          <b-form-group id="input-group-1" label="Title:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.title"
              placeholder="Title"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Text:" label-for="input-2">
            <b-form-textarea
              id="input-2"
              v-model="form.text"
              placeholder="Text"
              required
            ></b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary">Add</b-button>
          <b-button type="button"  v-on:click="clear">Reset</b-button>
        </b-form>
      </b-col>
      <b-col>
        <div v-for="todo in todos" :key="todo.id">
          <b-card
            class="mb-2"
            v-if="todo.created"
            v-bind:class="{done: todo.done}"
            header-tag="header"
            footer-tag="footer"
          >
            <template #header>
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="h3">{{ todo.title }}</h3>
                <div>
                  <b-form-checkbox v-bind:checked="todo.done" @change="toggle(todo)">
                    <span class="d-inline-block pt-1">Done</span>
                  </b-form-checkbox>
                </div>
              </div>
            </template>
            <b-card-text class="pb-2">
              <p>{{ todo.text }}</p>
            </b-card-text>
            <template #footer>
              <div class="d-flex justify-content-between align-items-center">
                <p>{{ todo.created.toDate() | dateFilter }}</p>
                <div>
                  <el-button v-on:click="remove(todo.id)" type="danger" icon="el-icon-delete" circle></el-button>
                </div>
              </div>
            </template>
          </b-card>
        </div>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import moment from 'moment'
export default {
  data: function() {
    return {
      form: {
        title: '',
        text: '',
        done: false,
      }
    }
  },
  created: function() {
    this.$store.dispatch('todos/init')
  },
  methods: {
    add() {
      this.$store.dispatch('todos/add', this.form)
      this.form.title = '',
      this.form.text = ''
    },
    clear() {
      this.form.title = '',
      this.form.text = ''
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
      },
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