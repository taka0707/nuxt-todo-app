import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  todos: []
})

export const mutations = {
  // todo編集開始
  startEdit(state, payload) {
    console.log('edit')
    payload.edit = true
  },
  // todo編集取り消し
  cancelEdit(state, payload) {
    console.log('cancel')
    payload.edit = false
  },
}

export const actions = {
  // firebaseからデータ取得
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  // todo登録
  add: firestoreAction((context, todoObject) => {
    try {
      if(todoObject.title.trim()) {
        todosRef.add({
          title: todoObject.title,
          text: todoObject.text,
          done: false,
          edit: false,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
    } catch(e) {
      console.log(`Error: ${JSON.stringify(e)}`)
    }
    
  }),
  // todo削除
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  // todoのdone切り替え
  toggle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  }),
  // todo更新
  update: firestoreAction((context, todoObject) => {
    try {
      if(todoObject.title.trim()) {
        todosRef.doc(todoObject.id).update({
          title: todoObject.title,
          text: todoObject.text,
          done: false,
          edit: false,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
    } catch(e) {
      console.log(`Error: ${JSON.stringify(e)}`)
    }
  }),
}

export const getters = {
  // createdでソート
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
  }
}