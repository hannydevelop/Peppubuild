import { createWebHistory, createRouter } from 'vue-router'

import SideBar from '@/components/SideBar.vue'

import HomePage from '../views/HomePage.vue'
import LogPage from '../views/LogPage.vue'
import AuthPage from '../views/AuthPage.vue'
import DashboardPage from '../views/DashboardPage.vue'

const routes = [
    {
        path: '/side',
        component: SideBar
    },
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/dashboard/overview',
        component: LogPage
    },
    {
        path: '/auth',
        name: 'Auth',
        component: AuthPage
    },
    {
        path: '/dashboard/projects',
        name: 'Dashboard',
        component: DashboardPage
    }
]
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

// function to retrieve specific cookie.
function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let split = el.split('=');
        cookie[split[0].trim()] = split.slice(1).join("=");
    })
    return cookie[name];
}

  // guard routes
router.beforeEach(async (to, from, next) => {
    let isAuthenticated = getCookie('pepputoken')
    if (to.name !== 'Auth' && !isAuthenticated) next({ name: 'Auth' })
    else next()
})

router.beforeEach(async (to, from, next) => {
    if (from.name !== 'Dashboard' && to.name == 'Home') next({ name: 'Dashboard' })
    else next()
})

export default router