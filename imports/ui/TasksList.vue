<template>
<div class="list-block">
    <transition-group name="list-trasition" tag="ul">
        <task v-for="task in tasks_vue_copy" :task="task" v-bind:key="task"></task>
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
  data() {
    return {tasks_vue_copy: []};
  },
  meteor: {
    tasks() {
        return Tasks.find({}, {sort: {createdAt: 1}});
    }
  },
  created() {
    let that = this;
    Tracker.autorun(function () {
      // _.shuffle([1, 2, 3]);
      // alert('here'); 
      let tasks = Tasks.find({}, {sort: {createdAt: 1}}).fetch();
      if(that.tasks_vue_copy.length === 0)
        that.tasks_vue_copy = tasks;
      else {
        // remove tasks in local but not in remote
        // add tasks in remote but not in local
        // update sync task properties
        let shouldRemove = _.differenceBy(that.tasks_vue_copy, tasks, '_id');
        let afterRemove = _.difference(that.tasks_vue_copy, shouldRemove);

        let shouldAdd = _.differenceBy(tasks, that.tasks_vue_copy, '_id');
        let allTasks = afterRemove.concat(shouldAdd);

        //sort according to remote tasks
        let sortedTasks = _.sortBy(allTasks, [(o)=>{ return _.indexOf(tasks, o); }]);

        that.tasks_vue_copy = _.map(sortedTasks, (o)=> {
          let remoteTask = _.find(tasks, (k)=>{ return k._id === o._id; });
          for(let k in remoteTask) o[k] = remoteTask[k];
          return o;
        });

      }
    });
  },
  components: {
    Task
  },
  // methods:{
  //   onDeleteTask(id){
  //     Tasks.remove({_id : id});
  //   }
  // }
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