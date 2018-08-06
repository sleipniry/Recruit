import '../basic.js';
import Vue from 'vue';
import App from './App.vue';
import Navigator from '../Navigator.vue'

new Vue({
  el: '#app',
  render: h => h(App)
});

new Vue({
  el: '#navigator',
  render: h => h(Navigator)
});