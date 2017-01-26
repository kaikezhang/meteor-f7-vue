<template>
  <!-- http://framework7.io/vue/swipeout-list.html -->
  <f7-list-item swipeout :title="task.name">
    <f7-swipeout-actions>
      <f7-swipeout-button delete @click="deleteTask">Delete</f7-swipeout-button>
    </f7-swipeout-actions>
  </f7-list-item>

</template>

<script>
import {Tasks} from '/lib/collections';

export default {
    props: ['task'],
    name: 'task',
    methods: {
      deleteTask(){
        // alert('agaga');
        // console.log('agaga');
        Tasks.remove({_id : this.task._id});
      }
    }
};
</script>