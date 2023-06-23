import Vue from 'vue';
import App from './App.vue';

Vue.component('hello-world', require('./Home.vue').default);

new Vue({
  el: '#app',
  render: h => h(App)
});