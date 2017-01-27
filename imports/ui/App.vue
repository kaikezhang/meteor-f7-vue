<template>
<div class="page-content">
  <div class="content-block-title">Todos List ({{incompleteCount}})</div>
  
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
import {Tasks} from '/lib/collections';

export default {
  data(){
    return {
      hideComplete : false,
    };
  },
  meteor: {
    incompleteCount(){
      return Tasks.find({ isDone: { $ne: true } }).count();
    }
  },
  components: {
    TasksList,
    CreateTask,
  },
  methods:{
    updateNumber(number){
      alert('number updated');
      this.incompleteCount = number;
    }
  }
};
</script>

<style>
</style>