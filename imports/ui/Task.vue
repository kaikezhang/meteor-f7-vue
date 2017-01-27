<template>
  <!-- http://framework7.io/vue/swipeout-list.html -->
  <!-- <f7-list-item checkbox name="my-checkbox" value="1" title="Checkbox 1" checked></f7-list-item> -->
  <f7-list-item swipeout checkbox :checked="task.isDone? true: false" @click="toggleIsDone"
  :title="task.name" v-bind:class="{ isPublic: task.isPublic, isDone: task.isDone}">
    <f7-swipeout-actions right>
      <f7-swipeout-button  @click.stop.prevent="toggleIsPublic" :color="task.isPublic? 'gray': 'yellow'">
        <span v-if="task.isPublic">Make Private</span>
        <span v-else>Make Public</span>
      </f7-swipeout-button>
    </f7-swipeout-actions>

    <f7-swipeout-actions left>
      <f7-swipeout-button delete @click.stop.prevent="deleteTask">Delete</f7-swipeout-button>
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
      // this.$emit('delete', this.task._id);
      Tasks.remove({_id : this.task._id});
    },
    toggleIsPublic(){
      // alert(this.task.checked);
      Tasks.update(this.task._id, {
        $set: { isPublic: !!! this.task.isPublic },
      });
    },
    toggleIsDone(){
      // alert(this.task.checked);
      Tasks.update(this.task._id, {
        $set: { isDone: !!! this.task.isDone },
      });
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