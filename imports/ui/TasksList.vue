<template>
<div class="list-block">
    <ul>
        <task v-for="task in tasks" :task="task"></task>
    </ul>  
</div>
</template>

<script>
import Task from './Task.vue';
import {Tasks} from '/lib/collections';

export default {
    name: 'create-task',
    meteor: {
        tasks() {
            return Tasks.find({});
        }
    },
    components: {
      Task
    },
};
</script>