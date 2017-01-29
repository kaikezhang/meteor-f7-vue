<template>
  <!-- http://framework7.io/vue/swipeout-list.html -->
  <!-- <f7-list-item checkbox name="my-checkbox" value="1" title="Checkbox 1" checked></f7-list-item> -->
  <f7-list-item swipeout checkbox :checked="task.isDone" @click="toggleIsDone" v-bind:class="{ isPublic: task.isPublic, isDone: task.isDone}">
    <f7-swipeout-actions right v-if="isOwner()">
      <f7-swipeout-button  @click.stop.prevent="toggleIsPublic" :color="task.isPublic? 'gray': 'yellow'">
        <span v-if="task.isPublic">Make Private</span>
        <span v-else>Make Public</span>
      </f7-swipeout-button>
    </f7-swipeout-actions>
    <div slot="inner">{{task.name}}</div>
    <f7-swipeout-actions left v-if="isOwner()">
      <f7-swipeout-button delete @click.stop.prevent="deleteTask">Delete</f7-swipeout-button>
    </f7-swipeout-actions>

  </f7-list-item>

</template>

<script>
import { Meteor } from 'meteor/meteor';
import {Tasks} from '/lib/collections';

export default {
  props: ['task'],
  name: 'task',
  methods: {
    deleteTask(){
      Meteor.call('tasks.remove', this.task._id);
    },
    toggleIsPublic(){
      Meteor.call('tasks.setPublic', this.task._id, !!! this.task.isPublic);
    },
    toggleIsDone(){
      Meteor.call('tasks.setDone', this.task._id, !!! this.task.isDone);
    },
    isOwner(){
      return this.task.owner === Meteor.userId();
    }
  }
};
</script>

<style>
  .makePublicButton {
    background-color: yellow;
    color: green;
  }

  .isPublic {
    color: green;
  }

  .isDone {
    text-decoration:line-through;
  }
</style>