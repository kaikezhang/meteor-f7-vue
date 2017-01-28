<template>
<div class="page-content">
  <my-login v-bind:opened="loginOpened" @closelogin="loginOpened = false;"></my-login>
  <div class="content-block-title">Todos List ({{incompleteCount}})</div>

  <div class="content-block-title" v-if="currentUser" >{{currentUser.username}}</div>
  <f7-button @click="showLogin" v-if="!currentUser">Login</f7-button>
  <f7-button v-else @click="logout">Logout</f7-button>

  <div class="list-block">
    <ul>
      <li>
        <label class="label-checkbox item-content">
          <input type="checkbox" value="hideComplete" v-model="hideComplete">
          <div class="item-media">
            <i class="icon icon-form-checkbox"></i>
          </div>
          <div class="item-inner">
            <div class="item-title">Hide complete</div>
          </div>
        </label>
      </li>
  </ul>
  </div>

  <create-task></create-task>
  <tasks-list :hideComplete="hideComplete" @incompleteTasksUpdate="updateNumber"></tasks-list>
</div>
</template>

<script>
import TasksList from './TasksList.vue';
import CreateTask from './CreateTask.vue';
import MyLogin from './MyLogin.vue';
import {Tasks} from '/lib/collections';

export default {
  data(){
    return {
      hideComplete : false,
      loginOpened : false,
    };
  },
  meteor: {
    incompleteCount(){
      return Tasks.find({ isDone: { $ne: true } }).count();
    },
    currentUser(){
        return Meteor.user();
    }    
  },
  components: {
    TasksList,
    CreateTask,
    MyLogin,
  },
  methods:{
    showLogin(){
      this.loginOpened = true;
    },
    updateNumber(number){
      alert('number updated');
      this.incompleteCount = number;
    },
    logout(){
      Meteor.logout();
    }
  }
};
</script>

<style>
</style>