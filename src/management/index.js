import '../basic.js';
import Vue from 'vue';
import Management from './Management.vue';
import Navigator from '../Navigator.vue'

new Vue({
  el: '#management',
  render: h => h(Management)
});

new Vue({
  el: '#navigator',
  render: h => h(Navigator)
});