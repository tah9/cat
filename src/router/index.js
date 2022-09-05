import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../views/login/Login'),

    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../views/User/Main'),
        children: [
            {
                path: 'home',
                component: () => import('../views/User/Home')
            }, {
                path: 'one',
                component: () => import('../views/User/One')
            }, {
                path: 'two',
                component: () => import('../views/User/Two')
            }, {
                path: 'three',
                component: () => import('../views/User/Three')
            }
        ],
    }, {
        path: '/login',
        component: () => import('../views/login/Login')
    }, {
        path: '/register',
        component: () => import('../views/login/Register')
    }, {
        path: '/upPwd',
        component: () => import('../views/login/EditPwd')
    }, {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin/Main'),
        children: [
            {
                path: 'home',
                component: () => import('../views/admin/Home')
            }, {
                path: 'one',
                component: () => import('../views/admin/One')
            }, {
                path: 'two',
                component: () => import('../views/admin/Two')
            }, {
                path: 'four',
                component: () => import('../views/admin/Four')
            }
        ]
    }, {
        path: '/three/add',
        component: () => import('../views/User/Three/Add')
    }, {
        path: '/three/DailyInfo/:id',
        component: () => import('../views/User/Three/DailyInfo')
    }, {
        path: '/auditDaily/:id',
        component: () => import('../views/admin/AuditDaily')
    }, {
        path: '/two/add',
        component: () => import('../views/User/Two/Add')
    }, {
        path: '/two/change',
        component: () => import('../views/User/Two/Change')
    }, {
        path: '/one/info',
        component: () => import('../views/User/One/Info')
    }, {
        path: '/twoInfo',
        component: () => import('../views/admin/TwoInfo')
    }, {
        path: '/myAskFor',
        component: () => import('../views/User/One/MyAskFor')
    }, {
        path: '/oneInfo',
        component: () => import('../views/admin/OneInfo')
    }, {
        path: '/homeInfo',
        component: () => import('../views/User/HomeInfo')
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
