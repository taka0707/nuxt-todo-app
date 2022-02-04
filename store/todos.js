import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  todos: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  add: firestoreAction((context, todoObject) => {
    try {
      if(todoObject.title.trim()) {
        todosRef.add({
          title: todoObject.title,
          text: todoObject.text,
          done: false,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
    } catch(e) {
      console.log(`Error: ${JSON.stringify(e)}`)
    }
    
  }),
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  toggle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}

export const getters = {
  orderdTodos: state => {
    return _.sortBy(state.todos, 'created')
  }
}