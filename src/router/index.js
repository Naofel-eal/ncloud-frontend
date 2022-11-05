import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue'

const routes = [
{
    name : 'HomePage',
    path: '/home',
    component: HomePage,
    props: true,
    meta : { requiresAuth: true }
},{
    name: 'LoginPage',
    path: '',
    component: LoginPage,
    props: true,
    meta : { requiresAuth: false }
},{
    name: 'RegisterPage',
    path : '/register',
    component: RegisterPage,
    props: true,
    meta : { requiresAuth: false }
}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    let isLogged = sessionStorage.getItem('isLogged');
    if (to.meta.requiresAuth){
        if(isLogged == 'false')
            next('');
        else  if (isLogged == 'true')
            next();
        else
            next('');
    }
    else if(isLogged == 'true' && to.name == 'LoginPage' || isLogged == 'true' && to.name == 'RegisterPage')
        next('/home');
    else
        next();
});

export default router;