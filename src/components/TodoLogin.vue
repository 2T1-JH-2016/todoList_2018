
<template>
    <section>
        <div class="loginform">
            <img src="../assets/android-chrome-192x192.png">
            <h1>Moda</h1>
            <p>You need to sign in to use this service!</p>
            <input type="text" class="login-input" placeholder="  E-Mail" v-model="email"/>
            <input type="password" class="login-input" placeholder="  Password" v-model="password"/>
            <button class = "loginBtn" @click="eLogin(email,password)">LOG IN</button>
            <button class = "signBtn" @click="clear()">SIGN IN</button>
            <div class="sns-login">
                With :
                <button @click=gLogin>
                    <i class="google login fa fa-google"></i>
                </button>
                <button @click=tLogin>
                    <i class="twitter login fa fa-twitter"></i>
                </button>
            </div>
        </div>

        <modal class="lg" v-if="signModal">
            <h3 slot="header">회원가입</h3>
            <span slot = "input">
                <label>E-Mail</label>
                <input type="text" class="login-input" style="width:80%" placeholder="  E-Mail" v-model="email"/>
                <label>Password</label>
                <input type="password" class="login-input" style="width:80%" placeholder="  Password" v-model="password"/>
                <label>Name</label>
                <input type="text" class="login-input" style="width:80%" placeholder="  Name" v-model="name"/>
            </span>
            <span slot = "footer">
                <i class="ModalBtn fas fa-check" aria-hidden="true" @click="signin(email, password)"></i>
                <i class="ModalBtn fas fa-times" aria-hidden="true" @click ="clear()"></i>
            </span>
        </modal>
    </section>
</template>

<script>
import Modal from './common/Modal.vue'
import { authRef } from '../store/db.js';
import { userInfo } from 'os';
import { mapGetters } from 'vuex';

export default {
    data() {
		return {
            email:"",
            password:"",
            name:"",
            signModal: false,
		}
    },
    methods:{
        signin(email,password){
            authRef.createUserWithEmailAndPassword(email, password).then( user =>{
                user.user.updateProfile({
                    displayName:this.name
                })
                this.$store.commit('userAuth',user.user);
                this.signModal=false;
            }, function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        },
        gLogin(){
            this.$store.dispatch('userAuth',1);
        },
        tLogin(){
            this.$store.dispatch('userAuth',2);
        },
        eLogin(email,password){
            authRef.signInWithEmailAndPassword(email, password).then( user =>{
                this.$store.commit('userAuth',user.user);
            }, function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        },
        clear(){
            this.email = "";
            this.password="";
            this.signModal = !this.signModal;
        }
    },
    beforeCreate(){
        authRef.onAuthStateChanged(user=>{
            if(user) this.$router.push('todo');
        });
    },
    components: {
         Modal: Modal,
    }
}

</script>
<style>
@media screen and (min-width:566px){
.lg{
        width: 100%;
    }
}
.modal-container{
  max-width: 500px;
}
.login {
    cursor: pointer;
    padding: 18px;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    border-radius: 50%;
}
.sns-login{
    display: inline;
}
.login:hover {
    opacity: 0.7;
}
.fa-google {
    border: solid 1px #2196F3;
    background: white;
    color: #2196F3;
}
.fa-twitter {
    background: #55ACEE;
    color: white;
}
.loginBtn{
    background: linear-gradient(to bottom, #48c6ef, #6f86d6);
    font-size: 18px;
    border: none;
    color: white;
    padding: 12px 116px;
    cursor: pointer;
    border-radius: 4px;
}
.signBtn{
    margin-top: 40px;
    margin-right: 35px;
    border-bottom: 2px solid #818181;
    color: #818181;
    cursor: pointer;
    font-size: 15px;
}
button{
    outline: none;
    background-color: rgba(0,0,0,0.0);
    border: none;
}
body {
    text-align: center;
    background-color: #F6F6F8;
}
img{
    width: 188px;
    height: 188px;
    margin-top: 3%;
    border-radius: 50%;
}
.loginform{
    border-radius: 10px;
    border: dotted 1px rgb(206, 206, 206);
    margin : 4% auto 4% auto;
    background-color: #FFFFFF;
    width: 360px;
    height: 580px;
}
.login-input {
    display: block;
    width: 260px;
    height: 12px;
    margin : 6px auto;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
