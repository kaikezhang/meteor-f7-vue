<template>
    <!-- Login Screen -->
  <f7-login-screen :opened="opened">
  <f7-view>
    <f7-pages>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>     
        <f7-list form @submit.prevent.stop="">
        <transition-group name="list-trasition" tag="ul">
          <f7-list-item :key="'input_username'" >
            <f7-label>Username</f7-label>
            <f7-input name="username" type='text' placeholder="Username" v-model="username" @keyup="clearErr"></f7-input>
          </f7-list-item>
          <f7-list-item :key="'input_password'">
            <f7-label>Password</f7-label>
            <f7-input name="password" type="password" placeholder="Password" v-model="password" @keyup="clearErr"></f7-input>
          </f7-list-item>
          <f7-list-item v-if="isSignUp" :key="'input_confirmPwd'">
            <f7-label>Confirm</f7-label>
            <f7-input name="password" type="password" placeholder="Confirm Password" v-model="confirmPwd" @keyup="clearErr"></f7-input>
          </f7-list-item>

          <f7-list-item v-if="errMessage" :key="'errMessage'" class="is-danger">
            <div class="centre">{{errMessage}}</div>
<!--             <div class="is-danger">
              {{errMessage}}
            </div> -->
          </f7-list-item>

        </transition-group>           
        </f7-list>
        <f7-list>
          <f7-button @click="login" v-if="!isSignUp">Sign In</f7-button>
          <f7-button @click='signUp'>Sign Up</f7-button>
          <f7-button @click='cancel' >Cancel</f7-button>
        </f7-list>
       
      </f7-page>
    </f7-pages>
  </f7-view>
  </f7-login-screen>
</template>

<script>
import { Accounts } from 'meteor/accounts-base';

export default {
  name: 'my-login',
  props:['opened'],
  data(){
    return {
      username:'',
      password: '',
      confirmPwd: '',
      isSignUp : false,
      errMessage: ''
    };
  },
  watch:{
    opened(newValue){
      if(newValue){
        this.isSignUp = false;
        this.errMessage = '';        
      }
    }
  },
  methods:{
    clearErr(){
      this.errMessage = '';          
    },
    cancel(){
      this.isSignUp = false;
      this.errMessage = '';         
      this.$emit('closelogin');
    },
    login(){
      this.errMessage = '';
      Meteor.loginWithPassword(this.username, this.password, (err)=> {
        if(err){
          this.errMessage = err.reason;
        }else{
          // alert('Login in');
          this.$emit('closelogin');
        }
      });

    },
    signUp(){
      this.errMessage = '';
      let valid = !/[~`!@.#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.username);
      if(!this.isSignUp)
        this.isSignUp = true;
      else if(!valid){
        this.errMessage ='Username contains special characters.';
      }
      else if(! (this.password === this.confirmPwd )) {
        this.errMessage ='Passwords is not the same.';
      }
      else{
        Accounts.createUser({
          username: this.username,
          password: this.password,
        }, (err)=>{
          if(err){
            this.errMessage = err.reason;
          }
          else{
            this.cancel();
          }
        });
      }
    }
  }
};  
</script>

<style>
  .is-danger {
    color: #D8000C;
    background-color: #FFBABA;
    font-size: 100%;
    text-align: center;
  }

  div.centre
  {
    width: 200px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }  
</style>