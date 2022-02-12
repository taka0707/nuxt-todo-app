<template>
  <section>
    <div class="container">
      <div>
        <logo />
        <h1 class="title mb-4">
          NUXT-TODO-APP
        </h1>
        <router-link to="/todos" class="todo-link">Todo登録へ</router-link>
      </div>
    </div>
  </section>
</template>

<script>

import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  }
}

</script>

<style scoped>

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}


.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.todo-link {
  font-weight: 50;
  font-size: 24px;
}

</style>
