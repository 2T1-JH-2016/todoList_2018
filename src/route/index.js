import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoContents from '../components/TodoContents'
import TodoLogin from '../components/TodoLogin'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: TodoLogin },
        { path: '/todo', component: TodoContents },
        { path: '*', component: TodoLogin },       
    ]
})

export default router


