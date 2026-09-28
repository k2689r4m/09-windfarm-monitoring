import { createWebHistory, createRouter } from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue';
import store from '../store'
import headerCompNot from '../components/HeaderComponent.vue'
import headerComp from '../components/HeaderComponentLogin.vue'
import footerComp from '../components/FooterComponent.vue'

const routes = [
    {
        path: '/',
        name: 'mainPage',
        components: {
            default: () => import('../views/MainPage.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/login',
        name: 'loginPage',
        components: {
            default: () => import('../views/LoginPage.vue'),
            header: headerCompNot,
            footer: footerComp
        },
        meta: { unauthorized: true }
    },
    {
        path: '/password',
        name: 'passwordPage',
        components: {
            default: () => import('../views/PasswordFindPage.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/overview_1',
        name: 'overviewPage_1',
        components: {
            default: () => import('../views/OverviewPage_1.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/overview_2',
        name: 'overviewPage_2',
        components: {
            default: () => import('../views/OverviewPage_2.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/overview_3',
        name: 'overviewPage_3',
        components: {
            default: () => import('../views/OverviewPage_3.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/overview_4',
        name: 'overviewPage_4',
        components: {
            default: () => import('../views/OverviewPage_4.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/overview_5',
        name: 'overviewPage_5',
        components: {
            default: () => import('../views/OverviewPage_5.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/diagnosis_1',
        name: 'diagnosisPage_1',
        components: {
            default: () => import('../views/DiagnosisPage_1.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/diagnosis_2',
        name: 'diagnosisPage_2',
        components: {
            default: () => import('../views/DiagnosisPage_2.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/diagnosis_3',
        name: 'diagnosisPage_3',
        components: {
            default: () => import('../views/DiagnosisPage_3.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/diagnosis_4',
        name: 'diagnosisPage_4',
        components: {
            default: () => import('../views/DiagnosisPage_4.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/diagnosis_5',
        name: 'diagnosisPage_5',
        components: {
            default: () => import('../views/DiagnosisPage_5.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/history',
        name: 'historyPage',
        components: {
            default: () => import('../views/HistoryPage.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/alarm',
        name: 'alarmPage',
        components: {
            default: () => import('../views/AlarmPage.vue'),
            header: headerComp,
            footer: footerComp
        }
    },
    {
        path: '/setting',
        name: 'settingPage',
        components: {
            default: () => import('../views/SettingPage.vue'),
            header: headerComp,
            footer: footerComp
        }
    },

    {
        path: '/test',
        name: 'chart',
        components: {
            default: () => import('../components/Chart.vue')
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const storeToken = store.getters.getLoginST
    // if (to.matched.some((record) => record.meta.unauthorized)) {
    //   return next()
    // } else if (to.matched.some((record) => record.meta.master) && storeToken) {
    //   if (store.getters.getUserInfo.grade == 0) {
    //     return next()
    //   } else {
    //     return next('/')
    //   }
    // } else if (storeToken) {
    //   return next()
    // }

    if (to.matched.some((record) => record.meta.unauthorized)) {
        return next()
    } else if (storeToken) {
        return next()
    } else {
        return next('/login')
    }
})

export default router
