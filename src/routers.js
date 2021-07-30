
import ChangesList from '@/pages/ChangesList.vue'

export const routes = [
    {
        name: 'changesList',
        path: '/',
        component: ChangesList
    },
    {
        path: '*',
        redirect: '/'
    },
]