<template>

<f7-view main>
<f7-pages>
<my-login v-bind:opened="loginOpened" @closelogin="loginOpened = false;"></my-login>
<f7-page name="home">
  <div class="page-content">
    <f7-navbar :title="appTitle">
    </f7-navbar>

  <f7-toolbar theme="white">
    <span style="color: #ff9500; padding-left:10px; font-size:125%;">{{currentUser? currentUser.username : ''}}</span>
    <a class="button" style="color: #007aff;" @click="showLogin" v-if="!currentUser">Login</a>
    <a v-else class="button" style="color: #007aff;" @click="logout">Logout</a>
  </f7-toolbar>

  <create-task v-if="currentUser"></create-task>

  <f7-list no-hairlines noHairlinesBetween style="margin-top: 0px; margin-bottom: 0px; border-bottom: 1px solid #D8DDE3;">
    <f7-list-item>
      <label class="label-checkbox item-content"  style="padding-left:0px;">
        <input type="checkbox" value="hideComplete" v-model="hideComplete">
        <div class="item-media">
          <i class="icon icon-form-checkbox"></i>
        </div>
        <div class="item-inner" style="margin-left:-10px;">
          <div class="item-title">Hide complete</div>
        </div>
      </label>
      <label class="label-checkbox item-content" v-if="currentUser">
        <input type="checkbox" v-model="showOnlyMe">
        <div class="item-media">
          <i class="icon icon-form-checkbox"></i>
        </div>
        <div class="item-inner" style="margin-left:-10px; padding-right:0px;">
          <div class="item-title">Show only mine</div>
        </div>
      </label>          
    </f7-list-item>  
  </f7-list>

  <tasks-list :hideComplete="hideComplete" :showOnlyMe="showOnlyMe" ></tasks-list>
</div>
</f7-page>
</f7-pages>
</f7-view>
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
      showOnlyMe : false,
    };
  },
  computed:{
    appTitle(){
      return `Todos List (${this.incompleteCount})`;
    },
    incompleteCount(){
      let counts = 0;
      this.tasks.forEach((task) => {
        if (task && (!this.hideComplete || !task.isDone) && (!this.showOnlyMe || task.owner === this.currentUser._id))
          counts += 1;
      });
      return counts;
    }
  },
  created(){
    Meteor.subscribe('tasks');
  },
  meteor: {
    tasks(){
      return Tasks.find({}); 
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
    logout(){
      this.showOnlyMe = false;
      Meteor.logout();
    }
  }
};
</script>

<style>
</style>