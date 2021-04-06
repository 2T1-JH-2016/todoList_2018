import Vue from 'vue';
import Vuex from 'vuex';
import {authRef, dbRef, gProvider, tProvider } from './db.js';

Vue.use(Vuex); // vuex 사용

export const store = new Vuex.Store({ // store export
    state:{
        todoItems:[],
        userAuth:'',
        search:'',
        filter:'all',
        viewType : false
    },
    getters:{
        getTodos: state => {
            return state.todoItems;
        },
        getFilter: state => {
            return state.filter;
        },
        getAuth: state =>{
            return state.userAuth;
        },
        getSearch: state => {
            return state.search;
        },
        getType: state => {
            return state.viewType;
        }
    },
    mutations:{
        userAuth:(state, value)=>{
            state.userAuth=value;
        },
        addTodo: (state, value) => {
            state.todoItems.push(value);
        },     
        filterTodo: (state, value) => {
            state.filter = value;
        },    
        viewTodo: (state, value) =>{
            state.viewType = value;
        },
        clearAll: state =>{
            state.todoItems = [];
        },
        searchTodo: (state, value) =>{
            state.search = value;
        }
    },
    actions:{
        userAuth:(context,num) =>{
            switch(num){
                case 1:
                authRef.signInWithPopup(gProvider).then(result=>{
                    context.commit('userAuth',result.user)
                })
                break;

                case 2:
                authRef.signInWithPopup(tProvider).then(result=>{
                    context.commit('userAuth',result.user)
                })
                break;
            }
        },
        clearAll: (context) => { // 비동기 작업 수행 후 mutation commit
           dbRef.doc(context.getters.getAuth.uid).collection('todos').get()
           .then(snapshot => {
            context.commit('clearAll');
             snapshot.forEach(doc => {
                 dbRef.doc(context.getters.getAuth.uid).collection('todos').doc(doc.id).delete();
             });
           })
           .catch(err => {
             console.log('Error delete documents', err);
           });
        },        
        getTodos: (context) => {  
            dbRef.onSnapshot(function(){
                if(context.getters.getAuth)
                dbRef.doc(context.getters.getAuth.uid).collection('todos').onSnapshot(query=>{
                    context.commit('clearAll');
                    query.forEach(doc => {
                        context.commit('addTodo', {
                            'id': doc.id,
                            'title': doc.data().title,
                            'context':doc.data().context,
                            'date':doc.data().date,
                            'time':doc.data().time,
                            'isComplete':doc.data().isComplete,
                            'picked':doc.data().picked,
                            'moreInfo':false
                        });
                    });
                })
            });
        },
        removeTodo: (context, payload) => {
            dbRef.doc(context.getters.getAuth.uid).collection('todos').doc(payload).delete();
        },
        addTodo: (context, value) => {
            let id = Date.now().toString();
            dbRef.doc(context.getters.getAuth.uid).collection('todos').doc(id).set(value);            
        },
        editTodo: (context, value) =>{
            dbRef.doc(context.getters.getAuth.uid).collection('todos').doc(value.id).update(value);
        },  
        completeTodo: (context, value) =>{
            value.isComplete = !value.isComplete;
            dbRef.doc(context.getters.getAuth.uid).collection('todos').doc(value.id).update(value);
        },
        logout:(context) =>{
            authRef.signOut().then(function() {
                 window.location.href = "/index.html"                 
            }).catch(function(error) {
                if(error){
                    alert("로그인 실패");
                }
            });
        }        
    }
});
