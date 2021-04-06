<template>
	<section>
	<div class="inputBox shadow">
		<span class="searchContainer" v-on:click="searchTodo">
			<i class="Btn fas	 fa-search" aria-hidden="true"></i>
		</span>
		<input type="text" class = "iptTitle" v-model="newTodoItem" placeholder="Type what you have to do" 
			v-on:keyup.enter="check">
		<span class="addContainer" v-on:click="check">
			<i class="Btn fas fa-plus" aria-hidden="true"></i>
		</span>
		<modal v-if="showModal" @keyup="showModal = false" >
			<h3 slot="header">경고</h3>
			<span slot="context">
				할 일을 입력하세요.</span>
			<span slot="footer" @click="showModal = false">
				<i class="ModalBtn fas fa-times" aria-hidden="true" @click="addModal = false"></i>
			</span>
		</modal>
	</div>

	<modal v-if="addModal">
		<h3 slot="header">추가 내용 설정</h3>
		<span slot = "input" @keyup.enter="addTodo">
			<label>마 감 날 짜</label>
			<input type = "date" v-model="newTodoDate">
			<label>마 감 시 간</label>
            <input type = "time" v-model="newTodoTime">
			<label>설 명</label>
			<textarea v-model="newTodoContext" placeholder = "내용을 입력하세요" 
				style="height:100px;"></textarea>
			<label>중 요 도</label>
			<div class ="importBtn">
				<input type="radio" id="normal" value="normal" style = "width:15px;" v-model="picked">
				<label for="normal">보통</label>
				<input type="radio" id="important" value="important"  style = "width:15px;" v-model="picked">
				<label for="important">중요</label>
				<input type="radio" id="emergency " value="emergency"  style = "width:15px;" v-model="picked">
				<label for="emergency ">긴급 </label>
			</div>				
			</span>
		<span slot = "footer">	
			<i class="ModalBtn fas fa-check" aria-hidden="true" @click="addTodo"></i>
			<i class="ModalBtn fas fa-times" aria-hidden="true" @click ="clearInput"></i>
		</span>
	</modal>
			
		<div class = "btnsdiv">
			<div class="dropdown">
				<button class="dropbtn">필터 
					<i class="fa fa-caret-down"></i>
				</button>				
				<div class="dropdown-content">
					<button v-for="pickbtn in buttons.pick" :key="pickbtn.title" class = "Btns" :class="pickbtn.id" 
				:title="pickbtn.title" v-text="pickbtn.title" @click="filterTodo(pickbtn.id)"></button>
				</div>
			</div>
			<button v-for="pickbtn in buttons.pick" :key="pickbtn.title" class = "Btns  filters" :class="pickbtn.id" 
				:title="pickbtn.title" v-text="pickbtn.title" @click="filterTodo(pickbtn.id)"></button>
			<button	v-for="vv in buttons.view" :key="vv.class" v-show="vv.type == listType" :title="vv.title" 
						class = "Btns" :class="vv.class" v-on:click="viewTodo()">
				<i class = "fas" :class="'fa-'+vv.class"></i>
			</button>
		</div>

	</section>
</template>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script>
	import Modal from './common/Modal.vue'

	export default {
		data() {
			return {
				newTodoItem: '',
				newTodoDate: '',
				newTodoTime: '',
				newTodoContext:'',
				showModal: false,
				addModal: false,
				picked : 'normal',
				listType : false,
				buttons:{
					'pick':[
						{'id' : 'all', 'title':'전체'},
						{'id' : 'normal', 'title':'보통'},
						{'id' : 'important', 'title':'중요'},
						{'id' : 'emergency', 'title':'긴급'}
					],
					'view':[
						{'class':'calendar-alt', 'title':'달력', 'type':true},
						{'class':'list-ul', 'title':'리스트','type':false},
					]	
				}
			}
		},
		methods: {
			addTodo() {
				if (this.newTodoItem !== "") {
					var title = this.newTodoItem && this.newTodoItem.trim();
					var context = this.newTodoContext && this.newTodoContext.trim();
					if(this.newTodoDate == ''){
						var d = new Date();    
						this.newTodoDate = this.leadingZeros(d.getFullYear(), 4) + '-' +
								  this.leadingZeros(d.getMonth() + 1, 2) + '-' +
									   this.leadingZeros(d.getDate(), 2) + ' ';
					}
					this.newTodoDate=this.newTodoDate.replace(/-/gi, "/");
					var value = {'title':title,'context':context,'date': this.newTodoDate,'time':this.newTodoTime,'isComplete':false,'picked':this.picked};
					this.$store.dispatch('addTodo',value);
					this.clearInput();
					this.searchTodo();
					
					navigator.vibrate([100]);   					
				} else {
					this.showModal = !this.showModal;
				}
			},
			filterTodo(value){
				this.$store.commit('filterTodo',value);
			},
			check(){
				var title = this.newTodoItem && this.newTodoItem.trim();
				if (title !== "")
					this.addModal=true;
				else {
					this.clearInput();
					this.showModal=true;
				}
			},
			clearInput() {
				this.addModal = false;
				this.newTodoItem = '';
				this.newTodoDate = '';
				this.newTodoContext = '';
				this.picked='normal';
			},
			viewTodo(){
				this.listType=!this.listType;
				this.$store.commit('viewTodo',this.listType);
			},
			searchTodo(){
				var title = this.newTodoItem && this.newTodoItem.trim();
				this.$store.commit('searchTodo',title);
			},
			leadingZeros(n, digits) {
				var zero = '';
				var i;
				n = n.toString();
				if (n.length < digits) {
			        for (i = 0; i < digits - n.length; i++)
			            zero += '0';
				 }
				return zero + n;
			}
		},
		components: {
			Modal: Modal
		}
	}
</script>

<style scoped>
	input:focus, .Btns:focus {
		outline: none;
	}

	input[type=date],input[type=time], textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px; 
      box-sizing: border-box; 
      margin-top: 6px;
      margin-bottom: 16px; 
      resize: vertical; 
      resize:none;
   }

	 .importBtn{
       width: 100%;
       color: #000000;
       padding: 12px;
 	}

	.inputBox {
		background: white;
		height: 50px;
		line-height: 50px;
		border-radius: 5px;
		margin : auto;
		margin-bottom: 10px;
		width: 80%;
	}
	.inputBox input {
		border-style: none;
		font-size: 0.9rem;
	}

	.iptTitle{
		width: 60%;
		margin: 0px auto;
		text-align: center; 
	}
	
	.addContainer {
		float: right;
		background: linear-gradient(to right, #48c6ef, #6f86d6);
		width: 3rem;
		border-radius: 0 5px 5px 0;
	}
	.searchContainer {
		float: left;
		background: linear-gradient(to right, #ff9a9e, #fad0c4);
		width: 3rem;
		border-radius: 5px 0 0 5px;
	}
	.Btn{
		color: azure;
	}
	.btnsdiv{
		font-weight: bold;
		width: 100%;
		background: linear-gradient(to right, #ff9a9e, #6f86d6);
	}
	.Btns {
		border: none;
		background-color: rgba(0,0,0,0.0);
		padding:15px 28px;
		font-size: 16px;
		cursor: pointer;
		color: white;
	}
	.all:active, .all:hover{
      color: black;
	  background-color: white;
	}
	.normal:active, .normal:hover{
      color: #62acde;
	  background-color: white;
	}
	.important:active, .important:hover{
      color: #FFBF00;		
	  background-color: white; 
	}
	.emergency:active, .emergency:hover{	
		background-color: white;
    	color: #FF0000; 
	}
	@media screen and (min-width:566px){
		.dropdown{
			display: none;
		}
	}
	@media screen and (max-width:566px){
		.filters{
			display: none;
		}
		.dropdown {
			float: left;
			margin-left: 15%;
			overflow: hidden;
		}

		.dropdown .dropbtn {
			outline: none;
			cursor: pointer;
			font-size: 16px;
			border: none;
			color: white;
			background-color: rgba(0,0,0,0.0);
			padding: 15px 28px;
		}

		.dropdown:hover .dropbtn {
			background-color: white;
			color:#6f86d6;
		}
		.dropdown-content {
			display: none;
			position: absolute;
			background-color: #f9f9f9;
			box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
			width: 103px;
			z-index: 100;	
		}

		.dropdown-content button {
			color: black;
			display: block;
			width: 100%;
			text-align: center;
		}

		.dropdown-content button:hover {
			background-color: #6f86d6;
			color: white
		}

		.dropdown:hover .dropdown-content {
			display: block;
		}
	}
</style>
