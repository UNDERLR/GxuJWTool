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
        redirect: '/tools/index',
        component: defineAsyncComponent(() => import('@/views/Tools.vue')),
        children: [
            {
                path: 'index',
                name: 'index',
                component: defineAsyncComponent(() => import('@/views/tools/index.vue'))
            },
            {
                path: 'scoreQuery',
                name: 'scoreQuery',
                component: defineAsyncComponent(() => import('@/views/tools/infoQuery/ScoreQuery.vue'))
            },
            {
                path: 'classScheduleQuery',
                name: 'classScheduleQuery',
                component: defineAsyncComponent(() => import('@/views/tools/infoQuery/ClassScheduleQuery.vue'))
            },
            {
                path: 'examInfoQuery',
                name: 'examInfoQuery',
                component: defineAsyncComponent(() => import('@/views/tools/infoQuery/ExamInfoQuery.vue'))
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
