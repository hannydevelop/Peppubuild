import { createApp } from "vue";
import Playground from './Playground.vue'
import Home from './Home.vue'
import App from './App.vue';
import Newreq from './Newreq.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/playground', component: Playground },
  { path: '/newrequest', component: Newreq }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

createApp(App).use(router).mount("#app");