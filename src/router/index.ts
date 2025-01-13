import {defineAsyncComponent} from "vue";
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: defineAsyncComponent(() => import('@/views/Home.vue'))
    },
    {
        path: '/tools',
        name: 'tools',
        component: defineAsyncComponent(() => import('@/views/Tools.vue')),
        children: [
            {
                path: 'scoreQuery',
                name: 'scoreQuery',
                component: defineAsyncComponent(() => import('@/views/tools/ScoreQuery.vue'))
            },
        ]
    },
    {
        path: '/settings',
        name: 'settings',
        component: defineAsyncComponent(() => import('@/views/Settings.vue')),
        children: [
        ]
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
