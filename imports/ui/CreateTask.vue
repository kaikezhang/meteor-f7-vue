<template>
<!-- <f7-list form>
  <f7-list-item>
    <f7-input type="text" v-bind:value="name" @keydown.enter.stop.prevent="insert">
  </f7-list-item>
</f7-list> -->

<div class="list-block">
  <ul>
    <li>
      <div class="item-content">
        <div class="item-inner">
          <div class="item-input">
            <input type="text" v-model="name" @keyup.enter="insert">
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>  

</template>
<script>

import {Tasks} from '/lib/collections';

export default {
	data(){
		return { 
			name: '' 
		};
	},
	name: 'create-task',
	methods: {
		insert(){
		  Tasks.insert({
        name: this.name,
        isPublic: false,
        isDone: false,
        createdAt: new Date(),
      });
		  this.name = '';
		  // alert('inserted');
		}
	}
};
</script>

