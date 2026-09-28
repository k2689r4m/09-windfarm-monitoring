import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        token: { accessToken: '', refreshToken: '' },
        myInfo: {
            grade: null,
            mem_id: null,
            mem_name: null
        },
        main: true,
        alarmList: []
    },
    getters: {
        getToken(state) {
            if (state.token.accessToken && state.token.refreshToken) {
                return {
                    accessToken: state.token.accessToken,
                    refreshToken: state.token.refreshToken
                }
            } else {
                return false
            }
        },
        getLoginST(state) {
            if (state.token.accessToken && state.token.refreshToken) {
                return true
            } else {
                return false
            }
        },
        getMain(state) {
            return state.main
        },
        getMyInfo(state) {
            return state.myInfo
        },
        getAlarmList(state) {
            return state.alarmList
        }
    },
    mutations: {
        setToken(state, data) {
            state.token = data
        },
        setMain(state, data) {
            state.main = data
        },
        setMyInfo(state, data) {
            state.myInfo = data
        },
        setAlarmList(state, data) {
            state.alarmList = data
        }
    },
    actions: {
        callSetToken({ state, commit }, data) {
            commit('setToken', data)
        },
        callSetMain({ state, commit }, data) {
            commit('setModel', data)
        },
        callSetMyInfo({ state, commit }, data) {
            commit('setMyInfo', data)
        },
        callSetAlarmList({ state, commit }, data) {
            commit('setAlarmList', data)
        }
    },
    plugins: [createPersistedState({ key: 'vuexStore', storage: window.sessionStorage })]
})
