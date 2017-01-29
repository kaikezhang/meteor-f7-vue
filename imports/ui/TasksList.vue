<template>
<div class="list-block">
    <transition-group name="list-trasition" tag="ul">
    <template v-for="task in tasks" v-if="!hideComplete || !task.isDone">
      <task :task="task" :key="task._id"></task>
    </template>
    </transition-group> 
</div>
</template>

<script>
import { Tracker } from 'meteor/tracker'

import Task from './Task.vue';
import {Tasks} from '/lib/collections';

// var _ = require('lodash');

export default {
  name: 'tasks-list',
  props:['hideComplete'],
  meteor: {
    tasks() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  },
  components: {
    Task
  },
};
</script>

<style>

.list-trasition-enter-active, .list-trasition-leave-active {
  transition: all 0.5s;
}
.list-trasition-enter, .list-trasition-leave-to  {
  opacity: 0;
  transform: translateY(10px);
}

.list-trasition-move {
  transition: transform 0.5s;
}

</style>