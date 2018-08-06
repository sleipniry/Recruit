import '../basic.js';
import Vue from 'vue';
import Job from './Job.vue';
import Navigator from '../Navigator.vue'

new Vue({
  el: '#job',
  render: h => h(Job)
});

new Vue({
  el: '#navigator',
  render: h => h(Navigator)
});