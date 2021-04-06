<template>
    <section>
        <modal v-if="editModal">
            <h3 slot="header">수정</h3>
            <span slot = "input">
                <label>할 일</label>
                <p style="color:#000000">{{saveTodo.title}}</p>
                <label>마 감 날 짜</label>
                <input type = "date" v-model="editDate">
                <label>마 감 시 간</label>
                <input type = "time" v-model="editTime">
                <label>내 용</label>
                <textarea id="subject" v-model="editContext" style="height:100px;"></textarea>
                <label>중 요 도</label>
                <div class ="importBtn">
                    <input type="radio" id="normal" value="normal" style = "width:15px;" v-model="editimportant">
                    <label for="normal">보통</label>
                    <input type="radio" id="important" value="important"  style = "width:15px;" v-model="editimportant">
                    <label for="important">중요</label>
                    <input type="radio" id="emergency " value="emergency"  style = "width:15px;" v-model="editimportant">
                    <label for="emergency ">긴급 </label>
                </div>
            </span>       
            <span slot = "footer">   
                <i class="ModalBtn fas fa-check" aria-hidden="true" @click="editTodo"></i>
                <i class="ModalBtn fas fa-times" aria-hidden="true" @click ="clearInput"></i>
            </span>
        </modal>
        
        <transition-group name="list" tag="ul">        
            <div v-for="(todoItem) in items" :key="todoItem.id">
               <div v-if="todoItem.isComplete == false">
               <div v-show="filterTodo(todoItem.picked,filter)">
                <div v-if="searchTodo(todoItem.title,search)">
                <li class="shadow" :title = todoItem.title sytle="height: 50px;">
                    <div v-if="todoItem.isComplete == false"  @click="completeTodo(todoItem)">
                        <div v-if="todoItem.picked=='important'">
                            <i class="checkBtn fas fa-check" style = "color:#FFBF00" aria-hidden="true"></i>
                            <div class="title">
                            {{ todoItem.title }}
                            </div>
                        </div>
                        <div v-else-if="todoItem.picked == 'emergency'">
                            <i class="checkBtn fas fa-check" style = "color:#FF0000" aria-hidden="true"></i><!--젤왼쪽 [checkbtn] -->
                            <div class="title">
                            {{ todoItem.title }}
                            </div>
                        </div>
                        <div v-else>
                            <i class="checkBtn fas fa-check" aria-hidden="true"></i>
                            <div class="title">
                            {{ todoItem.title }}
                            </div>
                        </div>
                    </div>
                    <span class="moreInfo" type="button" @click="more(todoItem)">
				        <i class="fas fa-angle-down" aria-hidden="true"></i>
			        </span>    
                    <span class="editBtn" type="button" @click="save(todoItem)">
                        <i class="far fa-edit" aria-hidden="true" @click="editModal =! editModal"></i>
                    </span>
                    <span class="removeBtn" type="button" @click="removeTodo(todoItem.id)">
                        <i class="far fa-trash-alt" aria-hidden="true"></i>
                    </span>
                 </li>
                <li v-show="todoItem.moreInfo">
                    <span style="padding-left:10px">{{todoItem.context}}</span>
                    <div style="margin-left:auto;">
                     <span v-if="todoItem.time != ''"> 시간 : {{todoItem.time}} /</span>
                     <span> 마감 : {{todoItem.date}} </span>
                    </div>
                    <button @click="shareTwitter(todoItem)"><i class="twitter icons fa fa-twitter"></i></button>
                </li>
                </div>
               </div>
            </div>
            </div>

            <div v-for="(todoItem) in items" :key="todoItem.id">
               <div v-if="todoItem.isComplete == true">
               <div v-show="filterTodo(todoItem.picked,filter)">
                <div v-if="searchTodo(todoItem.title,search)">
                <li class="shadow" :title = todoItem.title sytle="height: 50px;">
                  <i class="checkBtn fas fa-check" style = "color:#A4A4A4" aria-hidden="true" @click="completeTodo(todoItem)"></i>
                     <del class="title">{{ todoItem.title }}</del>
                    <span class="moreInfo" type="button" @click="more(todoItem)">
				        <i class="fas fa-angle-down" aria-hidden="true"></i>
			        </span>    
                    <span class="editBtn" type="button" @click="save(todoItem)">
                        <i class="far fa-edit" aria-hidden="true" @click="editModal =! editModal"></i>
                    </span>
                    <span class="removeBtn" type="button" @click="removeTodo(todoItem.id)">
                        <i class="far fa-trash-alt" aria-hidden="true"></i>
                    </span>
                 </li>
                <li v-show="todoItem.moreInfo">
                    <span style="padding-left:10px">{{todoItem.context}}</span>
                    <div style="margin-left:auto;">
                     <span v-if="todoItem.time != ''"> 시간 : {{todoItem.time}} /</span>
                     <span> 마감 : {{todoItem.date}} </span>
                    </div>
                  </li>
                </div>
               </div>
            </div>
           </div>
        </transition-group>
    </section>
</template>

<script>
   import Modal from './common/Modal.vue'
   import { mapGetters } from 'vuex';

   export default {
         data() {
            return {
               saveTodo:'', //수정버튼누를때 데이터를 넘겨줌으로써 취소버튼을 눌러도 데이터가 안날라감
               saveIndex:'',// 위와동일
               editContext:'',  //내용연동
               editDate:'', //달력연동
               editTime:'',
               editimportant:'',
               editModal: false,
               moreInfo: false,
            }
         },
      methods: {      
         filterTodo(picked,filter){
            if(filter === "all")
               return true;

            if(picked === filter)
               return true;
            else return false;
         },
         removeTodo(id) {
            this.$store.dispatch('removeTodo',id);
         },
         editTodo() {
            this.saveTodo.context = this.editContext && this.editContext.trim();
            if(this.saveTodo.date!==this.editDate)
               this.saveTodo.date = this.editDate;
            if(this.saveTodo.time!==this.editTime)
               this.saveTodo.time = this.editTime;
            this.saveTodo.moreInfo = false;
            this.saveTodo.picked = this.editimportant;
            this.$store.dispatch('editTodo',this.saveTodo);
            this.clearInput();
            },
         save(todoItem){
            this.saveTodo=todoItem; // 컨택스트, 데이트 등 통째로담긴 todoItem 을 줌
            this.editContext=todoItem.context;
            this.editDate=todoItem.date;
            this.editTime=todoItem.time;
            this.editimportant=todoItem.picked;
            },
         completeTodo(todoItem){
					this.$store.dispatch('completeTodo',todoItem);
            },
         searchTodo(key,search){     
            return (key.indexOf(search)>-1 || search ==='')
         },
         more(todoItem){
             if(todoItem.context !== ''||todoItem.date !== '')
                todoItem.moreInfo=!todoItem.moreInfo
         },
         clearInput() {
            this.editContext="";
            this.editDate="";
            this.editModal = false;
            this.editimportant='';
         }
      },
      components: {
         Modal: Modal,
      },
      computed: {
    // ...mapGetters({
    //   items:'getTodos'
    // }),    
         items (){
            return this.$store.getters.getTodos;
         },
         search (){
            return this.$store.getters.getSearch;
         },
         filter (){
            return this.$store.getters.getFilter;
         },
      },
      created(){ // ListView 생성 시 getTodos Action 수행    
         this.$store.dispatch('getTodos');
         this.$store.getters.getSearch;
         this.$store.getters.getFilter;
      }
   }
</script>

<style scoped>
   ul {
      list-style-type: none;
      padding-left: 0px;
      margin-top: 0;
      text-align: left;
   }
   li {
      display: flex;
      min-height: 50px;
      line-height: 50px;
      margin: 0.5rem 0;
      padding: 0 0.9rem;
      background: white;
      border-radius: 5px;
   }
   .title{
      float: left;
      height: 40px;
      width: 350px;
      text-overflow:ellipsis;
      white-space:nowrap; 
      overflow:hidden;
   }
   @media screen and (min-width:566px){
      .title{
         width: 380px;
      }
	}
	@media screen and (max-width:566px){
      .title{
         width: 180px;
      }
   }
   input[type=text],[type=date],[type=time], textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      margin-top: 6px;
      margin-bottom: 16px;
      resize:none;
   }
   .importBtn{
       width: 100%;
       color: #000000;
       padding: 12px;
   }

   .content {
       padding: 0 18px;
       overflow: hidden;
       background-color: #f1f1f1;
   }

   .checkBtn {
      float: left;
      line-height: 45px;
      color: #62acde;
      margin-right: 20px;
   }

   .moreInfo {
	  margin-left: auto;
	}
   .icons{
      margin-left: 25px;
      color: #000;
      background-color: rgba(0,0,0,0)
   }
   .editBtn {
      margin-left: 25px;
      color: #62acde;
   }
   .removeBtn {
      margin-left: 25px;
      color: #de4343;
   }
   .list-enter-active, .list-leave-active {
      transition: all 1s;
   }
   .list-enter, .list-leave-to {
      opacity: 0;
      transform: translateY(30px);
   }
</style>