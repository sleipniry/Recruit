import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

axios.defaults.baseURL = '/';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.use(ElementUI);
