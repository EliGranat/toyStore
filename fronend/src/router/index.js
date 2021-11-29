import vue from 'vue'
import vueRouter from 'vue-router'
import home from '@/pages/home.vue'
import toys from '@/pages/toys-app.vue'
import editToy from '@/pages/toys-edit.vue'
import detailsToy from '@/pages/toys-details.vue'
import dashboard from '@/pages/dashboard-toy.vue'
import form from '@/cmp/form.vue'
import drugAndDrop from '@/cmp/drug-and-drop.vue'
import reviewApp from '@/pages/review-app.vue'

vue.use(vueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/toys',
        name: 'toys',
        component: toys
    },
    {
        path: '/review-user/:userId?',
        name: 'review',
        component: reviewApp
    },
    {
        path: '/edit/:toyId?',
        name: 'edit-toy',
        component: editToy
    },

    {
        path: '/details/:toyId',
        name: 'details-toy',
        component: detailsToy
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
    }, {
        path: '/form',
        name: 'form',
        component: form
    }, {
        path: '/drug',
        name: 'drug&',
        component: drugAndDrop
    },

    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component:
            () =>
            import ( /* webpackChunkName: "about" */ '../pages/about.vue')
    }
]

const router = new vueRouter({
    routes
})

export default router