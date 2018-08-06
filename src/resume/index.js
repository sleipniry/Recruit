import '../basic.js';
import Vue from 'vue';
import Resume from './Resume.vue';
import Navigator from '../Navigator.vue'

new Vue({
  el: '#resume',
  render: h => h(Resume)
});

new Vue({
  el: '#navigator',
  render: h => h(Navigator)
});