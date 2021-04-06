<template>
	<header>
		<h1>ToDo It!</h1>
			<button class = "topBtn" v-on:click="onScroll">
				<i class="fas fa-angle-double-up" aria-hidden="true"></i>
			</button>
			<button class="logout-btn" @click="logout">Logout</button>
			<p class="userName">Welcome, {{name}}  </p>
		<div id="mySidenav" class="sidenav">
			<a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
			<a>USER : {{name}}</a>
			<a>{{provide}}</a>
			<a>{{mobile}}</a>
			<a href="#" onclick="javascript:window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fosp18-moda2.firebaseapp.com%2F&amp;src=sdkpreparse', 
                'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;" target="_blank" >
                페이스북 공유하기</a>
			<a href="#" style="margin-top:90%;" @click="logout">Logout</a>
		</div>
		<span class="profileBtn" @click="openNav()" >				
			<i class="fas fa-angle-double-right" aria-hidden="true"></i>
			</span>
	</header>
</template>

<script>	
	export default {
		  data() {
			return {
				mobile:"NativeFeature"
			}
		},
		methods: {
			logout(){
				navigator.vibrate([150]); 
				this.$store.dispatch('logout');
			},
			onScroll() {
    			document.body.scrollTop = 0;
    			document.documentElement.scrollTop = 0;
			},
 		    handleScroll (event) {
				if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
					document.getElementsByClassName("topBtn")[0].style.display = "block";
				} else {
					document.getElementsByClassName("topBtn")[0].style.display = "none";
				}
			},
			openNav() {
				document.getElementById("mySidenav").style.width = "80%";
				this.getNetwork();
			},
			closeNav() {
				document.getElementById("mySidenav").style.width = "0";
			},
			getNetwork(){
				this.mobile = "Network Status : " + navigator.connection.type;  
			}
		},
		created () {
			this.$store.getters.getAuth.displayName;
			window.addEventListener('scroll', this.handleScroll);

			navigator.connection.addEventListener('change', this.getNetwork);
		},
		destroyed () {
			window.removeEventListener('scroll', this.handleScroll);
		},
		computed: {
			name(){
				return this.$store.getters.getAuth.displayName;
			},
			provide(){
				return this.$store.getters.getAuth.providerData["0"].providerId+"";
			}
    	},
	}
</script>

<style scoped>
	h1 {
		color: #2F3B52;
		font-weight: 900;
		margin: 2.5rem 0 1.5rem;
	}
	.topBtn {
		display: none;
		position: fixed;
		width: 3rem;
		bottom: 20px;
		right: 20px;
		z-index: 99;
		font-size: 18px;
		border: none;
		outline: none;
		background: linear-gradient(to left, rgb(184, 75, 67), rgb(206, 98, 125));
		color: white;
		cursor: pointer;
		padding: 15px;
		border-radius: 5px;
	}

	@media screen and (min-width:566px){
		.logout-btn{
			position: absolute;
			top: 20px;
			right: 20px;
			background-color: #ddd;
			border: none;
			color: black;
			padding: 8px 18px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			margin: 4px 2px;
			cursor: pointer;
			border-radius: 16px;
		}
		.userName{
			position: absolute;
			top: 18px;
			font-size: 14px;
			right: 120px;
		}
		.sidenav{
			display: none;
		}
		.profileBtn{
			display: none;
		}
	}

	@media screen and (max-width:566px){
		/*작은화면*/
		.logout-btn{
			display: none;
		}
		.userName{
			display: none;
		}
		.profileBtn{
			position: absolute;
			top: 5px;
			left: 15px;
			font-size:30px;
			cursor:pointer;
			color: #2F3B52

		}
		.sidenav {
			height: 100%;
			width: 0px;
			position: fixed;
			z-index: 99;
			top: 0;
			left: 0;
			background-color: #ffffff;
			overflow-x: hidden;
			transition: 0.5s;
			padding-top: 80px;
		}
		.sidenav a {
			padding: 8px 8px 8px 32px;
			text-decoration: none;
			font-size: 18px;
			color: #818181;
			display: block;
			transition: 0.3s;
		}
		.sidenav a:hover {
			color: #000000;
		}
		.sidenav .closebtn {
			position: absolute;
			top: 0;
			right: 25px;
			font-size: 36px;
			margin-left: 50px;
		}
	}
</style>
