<template>
  <!-- http://framework7.io/vue/swipeout-list.html -->
  <!-- <f7-list-item checkbox name="my-checkbox" value="1" title="Checkbox 1" checked></f7-list-item> -->
  <f7-list-item swipeout checkbox disabled :checked="task.isDone" @click="toggleIsDone">
    <f7-swipeout-actions right v-if="isOwner">
      <f7-swipeout-button  @click.stop.prevent="toggleIsPublic" :color="task.isPublic? 'gray': 'yellow'">
        <span v-if="task.isPublic">Make Private</span>
        <span v-else>Make Public</span>
      </f7-swipeout-button>
    </f7-swipeout-actions>
    <div slot="inner" style="padding-right:10px" v-bind:class="{ isOwner: isOwner}">{{task.username()}}</div>
    <div slot="inner-start" v-bind:class="{ isPublic: task.isPublic, isDone: task.isDone}">{{task.name}}</div>
    <f7-swipeout-actions left v-if="isOwner">
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

  computed: {
    isOwner(){
      return this.task.owner === Meteor.userId();
    }
  },
  methods: {
    deleteTask(){
      Meteor.call('tasks.remove', this.task._id);
    },
    toggleIsPublic(){
      Meteor.call('tasks.setPublic', this.task._id, !!! this.task.isPublic);
    },
    toggleIsDone(){
      if(this.isOwner)
        Meteor.call('tasks.setDone', this.task._id, !!! this.task.isDone);
    },
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

  .isOwner{
    color: #ff9500;
  }

  .isDone {
    text-decoration:line-through;
  }
</style>