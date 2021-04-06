<template>
	<section>
        <modal v-if="alertModal&&items.length" v-on:close="alertModal = false">
            <h3 slot="header">마감 임박</h3>
            <span slot = "context">
                <div class="list">
                    <label style="color: #62acde">할 일</label>
                    <label class="dday" style="color: #62acde">마감일</label>
                </div>
                    <div v-for="(todoItem) in items" :key="todoItem.id">             
                    <div class = "list" v-if="alertTodo(todoItem) == 0">
                        <label>{{todoItem.title}}</label>
                        <label class = "dday" style="color:#FF0000"> D - Day </label>            
                    </div>
                    <div class = "list" v-else-if="alertTodo(todoItem)==1">
                        <label>{{todoItem.title}}</label>
                        <label class = "dday" style="color:#FE9A2E">  D - 1 </label>
                    </div>
                    <div class = "list" v-else-if="alertTodo(todoItem)==2">
                        <label>{{todoItem.title}}</label>
                        <label class = "dday" style="color:#86B404">  D - 2 </label>
                    </div>
                    <div class = "list" v-else-if="alertTodo(todoItem)==3">
                        <label>{{todoItem.title}}</label>
                        <label  class = "dday"> D - 3 </label>
                    </div>
                    <div class = "list" v-else-if="alertTodo(todoItem)<0">
                        <label>{{todoItem.title}}</label>
                        <label  class = "dday" style="color:#FF0000" > OVER </label>
                    </div>
                </div>
                <div v-if="alertModal = view()"></div>  
            </span>
            <span slot = "footer" @click ="alertModal = false">	
                <i class="ModalBtn fas fa-times" aria-hidden="true"></i>
            </span>
        </modal>

	</section>
</template>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script>
	import Modal from './common/Modal.vue'
    import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
                alertModal:true,
                count : false
			}
        },
		methods: {
            alertTodo(todoItem){
                if(todoItem.isComplete == false){
                    if(todoItem.date !== ''){
                    var today = new Date().getTime()
                    var check = this.parseDate(todoItem.date).getTime()
                    var day = Math.ceil((check-today)/24/60/60/1000)
                    
                    if(day < 4)
                        this.count = true;

                    return day
                    }
                }                    
            },
            parseDate(input) {
             var parts = input.match(/(\d+)/g);
             return new Date(parts[0], parts[1]-1, parts[2]); 
            },
            view(){    
                if(this.items.length != 0){    
                    return  this.count;
                }
                else return true;
            }
		},  
		components: {
			'modal': Modal
        },
        computed:{
            items (){               
                return this.$store.getters.getTodos;
            },
        }
	}
</script>

<style scoped>
    .list{
        padding: 10px;
    }
    .dday{
        width: 40%;
        float: right;
        margin-right:15px;
    }
</style>
