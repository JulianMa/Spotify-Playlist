import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import login from './components/login.vue'
import logedin from './components/logedin.vue'
import create from './components/create.vue'
import getTracks from './components/getTracks.vue'
import getSongs from './components/getAllSongs.vue'

Vue.use(VueRouter);
Vue.use(VueAxios, Axios);

const routes = [
    {path: '/', component: login, props: true},
    {path: '/access_token*', components: {default: logedin, create: create, addTracks: getTracks, getSongs: getSongs}, props: true},
];

const router = new VueRouter({
    routes
});

let bus = new Vue();

new Vue({
    el: '#app',
    router,
    bus,
    render: h => h(App)
});
