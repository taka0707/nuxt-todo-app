<template>
  <b-container class="py-5">
    <b-row>
      <b-col>
        <!-- 入力フォーム -->
        <b-form v-on:submit.prevent="add">
          <!-- todoタイトル入力フォーム -->
          <b-form-group id="input-group-1" label="Title:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.title"
              placeholder="Title"
              required
            ></b-form-input>
          </b-form-group>
          <!-- todoテキスト入力フォーム -->
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

        <p class="mt-4"><router-link to="/">▶︎ 戻る</router-link></p>

      </b-col>
      <b-col>
        <!-- 登録済todo表示 -->
        <div v-for="todo in todos" :key="todo.id">
          <b-card
            class="mb-2"
            v-if="todo.created"
            v-bind:class="{done: todo.done}"
            header-tag="header"
            footer-tag="footer"
          >
            <template #header>
              <!-- todoタイトル表示 -->
              <div class="d-flex justify-content-between align-items-center" v-if="!todo.edit">
                <h3 class="h3">{{ todo.title }}</h3>
                <div>
                  <b-form-checkbox v-bind:checked="todo.done" @change="toggle(todo)">
                    <span class="d-inline-block pt-1">Done</span>
                  </b-form-checkbox>
                </div>
              </div>
              <b-form-input v-if="todo.edit" v-model="editTitle" required></b-form-input>
            </template>
            <!-- todoテキスト表示 -->
            <b-card-text class="pb-2">
              <p v-if="!todo.edit">{{ todo.text }}</p>
              <b-form-textarea v-if="todo.edit" v-model="editText"></b-form-textarea>
            </b-card-text>
            <template #footer>
              <div class="d-flex justify-content-between align-items-center">
                <p>{{ todo.created.toDate() | dateFilter }}</p>
                <!-- テキスト編集・削除ボタン -->
                <div v-if="!todo.edit">
                  <el-button v-on:click="startEdit(todo)" v-if="!todo.done" type="success" icon="el-icon-edit" circle></el-button>
                  <el-button v-on:click="remove(todo.id)" type="danger" icon="el-icon-delete" circle></el-button>
                </div>
                <!-- テキスト編集キャンセル・更新ボタン -->
                <div v-if="todo.edit">
                  <el-button v-on:click="cancelEdit(todo)" type="" icon="el-icon-close" circle></el-button>
                  <el-button v-on:click="update(todo)" type="primary" icon="el-icon-check" circle></el-button>
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
        edit: false
      },
      editTitle: '',
      editText: ''
    }
  },
  created: function() {
    this.$store.dispatch('todos/init')
  },
  methods: {
    // todo登録
    add() {
      this.$store.dispatch('todos/add', this.form)
      this.form.title = '',
      this.form.text = ''
    },
    // 入力フォームの値クリア
    clear() {
      this.form.title = '',
      this.form.text = ''
    },
    // todo削除
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    },
    // done切り替え
    toggle(todo) {
      this.$store.dispatch('todos/toggle', todo)
    },
    // todoの編集開始
    startEdit(todo) {
      this.editTitle = todo.title
      this.editText = todo.text
      this.$store.commit('todos/startEdit', todo)
    },
    // todoの編集取り消し
    cancelEdit(todo) {
      this.$store.commit('todos/cancelEdit', todo)
    },
    // todo更新
    update(todo) {
      let todoId = todo.id
      let todoObject = {
        id: todoId,
        title: this.editTitle,
        text: this.editText
      }
      this.$store.dispatch('todos/update', todoObject)
    }
  },
  computed: {
      // todosをcreatedでソートして取得
      todos() {
        return this.$store.getters['todos/orderdTodos']
      },
  },
  filters: {
    // 日時表示
    dateFilter: function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>

<style>

/* doneがtrue時の背景色 */
.done {
  background-color: darkgray;
}

</style>