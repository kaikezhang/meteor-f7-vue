<template>
<f7-list>
  <f7-list-item>
    <f7-label>New task:</f7-label>
    <input type="text" v-model="name" @keyup.enter="insert" class="new-task-input">
  </f7-list-item>
</f7-list>

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
    padding: 8px;
    border-bottom: 2px solid #3CBC8D;
  }
</style>

