<template>

 <input type="text" v-model="name" @keyup.enter="insert" class="new-task-input" placeholder="Create a new task">
 

</template>
<script>

import { Tasks } from '/lib/collections';
import { Meteor } from 'meteor/meteor';

export default {
  data(){
    return { 
      name: '' 
    };
  },
  name: 'create-task',
  methods: {
    insert(){
      Meteor.call('tasks.insert', this.name)
      this.name = '';
    }
  }
};
</script>

<style>
  input[type=text].new-task-input {
    display: block;
    padding: 8px;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    font-size: 140%;
    border: 0px;
    border-bottom: 2px solid #3CBC8D;
  }
</style>

