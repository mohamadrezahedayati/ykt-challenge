
import ChangesList from '@/pages/ChangesList.vue'
// const Logout = (reslove) => {
//     require.ensure(['@/views/Logout/Logout.vue'],() => {
//         reslove(require('@/views/Logout/Logout.vue'));
//     });
// };
// const CallsQueue = (reslove) => {
//     require.ensure(['@/views/Dashboard/MainContainer/CallsQueue/CallsQueue.vue'],() => {
//         reslove(require('@/views/Dashboard/MainContainer/CallsQueue/CallsQueue.vue'));
//     });
// };
// const Contacts = (reslove) => {
//     require.ensure(['@/views/Dashboard/MainContainer/Contacts/Contacts.vue'],() => {
//         reslove(require('@/views/Dashboard/MainContainer/Contacts/Contacts.vue'));
//     });
// };
// const Dashboard = (reslove) => {
//     require.ensure(['@/views/Dashboard/Dashboard.vue'],() => {
//         reslove(require('@/views/Dashboard/Dashboard.vue'));
//     });
// };

export const routers = [
    {
        name: 'changesList',
        path: '/changes-list',
        component: ChangesList
    },
    {
        path: '*',
        redirect: '/changesList'
    },
]