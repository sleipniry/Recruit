import '../basic.js';
import Vue from 'vue';
import Welcome from './Welcome.vue';
import Navigator from '../Navigator.vue'

new Vue({
  el: '#welcome',
  render: h => h(Welcome)
});

new Vue({
  el: '#navigator',
  render: h => h(Navigator)
});