<template>
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
	data() {
		return { 
			name: '' 
		};
	},
	name: 'create-task',
	methods: {
		insert(){
		  Tasks.insert({name: this.name});
		  this.name = '';
		  // alert('inserted');
		}
	}
};
</script>