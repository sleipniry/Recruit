import '../basic.js';
import Vue from 'vue';
import Process from './Process.vue';
import Navigator from '../Navigator.vue'

new Vue({
  el: '#process',
  render: h => h(Process)
});

new Vue({
  el: '#navigator',
  render: h => h(Navigator)
});