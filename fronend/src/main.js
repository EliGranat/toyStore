import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/style.scss'
import * as VueGoogleMaps from 'vue2-google-maps'
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import VueDragDrop from 'vue-drag-drop';
Vue.use(VueDragDrop);

// var Avatar = require('vue-avatar')

// extend({
//     components: {
//         'avatar': Avatar.Avatar
//     },
// })

// Add the required rule
extend('required', {
    ...required,
    message: 'This field is required'
});

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCQ6tXHw7h_o4k-qIIjjfQoIP2avTDx2No',
        libraries: 'places', // This is required if you use the Autocomplete plugin
    },
})


Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')