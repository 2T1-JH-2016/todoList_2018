<template>
  <div>
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <div v-show="list">
      <TodoList></TodoList>
    </div>
    <div v-show="!list">
      <TodoCalen></TodoCalen>
    </div>
    <TodoFooter></TodoFooter>
    <TodoAlert></TodoAlert>
  </div>
</template>

<script>
import TodoHeader from './TodoHeader.vue'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import TodoFooter from './TodoFooter.vue'
import TodoAlert from './TodoAlert.vue'
import TodoCalen from './TodoCalen.vue'


import { authRef } from '../store/db.js';
export default { 
  created(){
    authRef.onAuthStateChanged(user=>{
      if(!user) this.$router.push('/');
        else{
        this.$store.commit('userAuth',user);
        }
    }),
    navigator.connection.addEventListener('change', this.getNetwork);
    },
  components: {
    'TodoHeader': TodoHeader,    'TodoInput': TodoInput,
    'TodoList': TodoList,    'TodoFooter': TodoFooter,
    'TodoAlert':TodoAlert, 'TodoCalen':TodoCalen
  },
  computed: {
    list (){
      return this.$store.getters.getType;
    }
  }
}
</script>
<style>
  body {
    text-align: center;
    background-color: #F6F6F8;
  }
  input {
    border-style: groove;
    width: 200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }
</style>
