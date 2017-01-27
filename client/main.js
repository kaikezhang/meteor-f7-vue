window._ = require('lodash');

import { Meteor } from 'meteor/meteor';
import { Vue } from 'meteor/akryum:vue';


// use framework with vue
import Framework7Vue from 'framework7-vue';
// Main app
import App from '/imports/ui/App.vue';

Vue.use(Framework7Vue);

Meteor.startup(() => {
  new Vue({
  	el: '#app',
    render: h => h(App),
    framework7: {
      root: '#app',
    },
   //  components: {
   //    app: App
  	// }
  });
});
