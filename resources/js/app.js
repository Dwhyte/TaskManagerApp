/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex';
import StoreData from './store';
import VueDraggable from 'vue-draggable';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueFlashMessage from 'vue-flash-message';
require("vue-flash-message/dist/vue-flash-message.min.css");


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('project-list-component', require('./components/ProjectListComponent').default);
// Vue.component('tasks-component', require('./components/TasksComponent').default);
Vue.component('task-manager-component', require('./components/TaskManagerComponent').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(VueAxios, axios);
Vue.use(VueDraggable);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 5000,
    pauseOnInteract: true
  }
});

const store = new Vuex.Store(StoreData);

const app = new Vue({
    el: '#app',
    store,
});
