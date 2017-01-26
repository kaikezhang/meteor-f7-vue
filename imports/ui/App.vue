<template>
<div class="page-content">
  <div class="content-block-title">Todos List</div>
  <create-task></create-task>
  <tasks-list></tasks-list>
</div>
</template>

<script>
import TasksList from './TasksList.vue';
import CreateTask from './CreateTask.vue';

export default {
  components: {
    TasksList,
    CreateTask,
  },
};
</script>

<style>
</style>