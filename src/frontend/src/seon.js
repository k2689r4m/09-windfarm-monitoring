import dayjs from 'dayjs'
import axios from 'axios'
import router from './router'
import store from './store'
// var weekday = require('dayjs/plugin/weekday')
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday)
axios.defaults.headers.common.Accept = 'application/json'

window.model = null
const DB_NAME = 'glbDatabase'
const STORE_NAME = 'glb'

const PY_M2_EX = 3.3058
const M2_PY_EX = 0.3025
window.now_date = ''

const MONEY_FORMAT_TYPE = {
    LITTLE: 'LITTLE',
    MUCH: 'MUCH',
    LOAN: 'LOAN',
    RANGE: 'RANGE',
    TAX: 'TAX',
    MOBILE: 'MOBILE',
    MOBILE2: 'MOBILE2'
}

const MONEY1 = {
    masked: false,
    prefix: '',
    suffix: '',
    thousands: ',',
    decimal: '.',
    precision: 0,
    disableNegative: false,
    disabled: false,
    min: null,
    max: null,
    allowBlank: false,
    minimumNumberOfCharacters: 0,
    shouldRound: true,
    focusOnRight: false
}

const MONEY2 = {
    masked: false,
    prefix: '',
    suffix: '',
    thousands: ',',
    decimal: '.',
    precision: 2,
    disableNegative: false,
    disabled: false,
    min: null,
    max: null,
    allowBlank: false,
    minimumNumberOfCharacters: 0,
    shouldRound: true,
    focusOnRight: false
}

function c(e, t, a, r) {
    if ('number' != typeof e) return '0'

    var l = e,
        o = '',
        i = !1
    l < 0 && ((l *= -1), (i = !0)), a && (l *= 1e4)
    var s = Math.floor(l / 1e8),
        c = Math.floor(l % 1e8),
        m = Math.floor(c / 1e4),
        p = Math.floor(c % 1e4)
    switch (t) {
        case MONEY_FORMAT_TYPE.MUCH:
            if (0 === l) break
            var d = void 0
            if (
                (l >= 1e8
                    ? ((d = l / 1e8), (o = '억'))
                    : l >= 1e7
                      ? ((d = l / 1e7), (o = '천'))
                      : l >= 1e6
                        ? ((d = l / 1e6), (o = '백'))
                        : l >= 1e4
                          ? ((d = l / 1e4), (o = '만'))
                          : l >= 1 && ((d = l), (o = '원')),
                'number' == typeof r)
            ) {
                var u = d.toString(),
                    E = u.indexOf('.')
                0 === r ? (d = parseInt(d)) : E > 0 && (d = u.slice(0, E + 1 + r))
            }
            o = d + o
            break
        case MONEY_FORMAT_TYPE.LITTLE:
            if (0 === l) {
                o = '0'
                break
            }
            s > 0 && (o = s.toLocaleString() + '억'), m > 0 && (o += m.toLocaleString())
            break
        case MONEY_FORMAT_TYPE.LOAN:
            if (0 === l) {
                o = '0'
                break
            }
            s > 0 && (o = s.toLocaleString() + '억'),
                m > 0 && (o += m.toLocaleString() + '만'),
                p > 0 && (o += p.toLocaleString() + '원')
            break
        case MONEY_FORMAT_TYPE.TAX:
            if (0 === l) {
                o = '-원'
                break
            }
            s > 0 && (o = s.toLocaleString() + '억'),
                m > 0 && (o += ' ' + m.toLocaleString() + '만'),
                p > 0 && (o += ' ' + p.toLocaleString()),
                (o += '원'),
                o.trim()
            break
        case MONEY_FORMAT_TYPE.MOBILE:
            if (0 === l) {
                o = '0'
                break
            }
            s > 0 && (o = s.toLocaleString() + '억'),
                m > 0 && (o += o ? ' ' + m.toLocaleString() : m.toLocaleString())
            break
        case MONEY_FORMAT_TYPE.MOBILE2:
            if (0 === l) {
                o = '0'
                break
            }
            s > 0 && (o = s.toLocaleString() + '억'),
                m > 0 && (o += o ? ' ' + m.toLocaleString() + '만' : m.toLocaleString() + '만')
    }
    return i && (o = '-' + o), o
}

function base64toFile(base_data, filename) {
    var arr = base_data.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            try {
                resolve(reader.result)
            } catch (error) {
                reject(null)
            }
        }

        reader.onerror = async () => {
            reject(null)
        }
    })
}

async function apiGET(_path) {
    const path = import.meta.env.VITE_HOST_BACK + _path

    let msg = '잠시후 다시 시도 해주세요.'
    try {
        const storeToken = store.getters.getToken

        if (storeToken) {
            axios.defaults.headers.common.authorization = storeToken.accessToken
            axios.defaults.headers.common.refresh = storeToken.refreshToken
        }

        const re = await axios.get(path)

        if (re.data.status == 402) {
            const ref = await axios.get(import.meta.env.VITE_HOST_BACK + '/user/refresh')
            axios.defaults.headers.common.authorization = ref.data.data.accessToken
            axios.defaults.headers.common.refresh = ref.data.data.refreshToken

            store.dispatch('callSetToken', {
                accessToken: ref.data.data.accessToken,
                refreshToken: ref.data.data.refreshToken
            })

            const re_ = await axios.get(path)
            return re_.data
        } else {
            return re.data
        }
    } catch (e) {
        if (e.response?.status == 401) {
            axios.defaults.headers.common.authorization = ''
            axios.defaults.headers.common.refresh = ''

            router.push({
                name: 'loginPage'
            })
            return
        } else {
            if (e.response.data.message) {
                alert(msg)
            }
        }
    }
}
async function apiPOST(_path, param) {
    const path = import.meta.env.VITE_HOST_BACK + _path

    let msg = '잠시후 다시 시도 해주세요.'
    try {
        const storeToken = store.getters.getToken

        if (storeToken) {
            axios.defaults.headers.common.authorization = storeToken.accessToken
            axios.defaults.headers.common.refresh = storeToken.refreshToken
        }

        const re = await axios.post(path, param)
        if (re.data.status == 402) {
            const ref = await axios.get(import.meta.env.VITE_HOST_BACK + '/user/refresh')
            axios.defaults.headers.common.authorization = ref.data.data.accessToken
            axios.defaults.headers.common.refresh = ref.data.data.refreshToken

            store.dispatch('callSetToken', {
                accessToken: ref.data.data.accessToken,
                refreshToken: ref.data.data.refreshToken
            })

            const re_ = await axios.post(path, param)
            return re_.data
        } else {
            return re.data
        }
    } catch (e) {
        if (e.response?.status == 400) {
            if (e.response?.data?.errors?.length) {
                alert(e.response?.data.errors[0].msg)
            } else if (e.response?.data?.message?.length) {
                alert(e.response?.data.message)
            }

            return false
        } else if (e.response?.status == 401) {
            axios.defaults.headers.common.authorization = ''
            axios.defaults.headers.common.refresh = ''

            router.push({
                name: 'loginPage'
            })
            return
        } else if (e.response?.status == 500) {
            if (e.response.data.message) {
                alert(e.response.data.message)
            } else {
                alert(msg)
            }

            return false
        } else {
            if (e.response.data.message) {
                alert(msg)
            }
        }
        return
    }
}

async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1)

        request.onupgradeneeded = (event) => {
            const db = event.target.result
            db.createObjectStore(STORE_NAME)
        }

        request.onsuccess = (event) => {
            resolve(event.target.result)
        }

        request.onerror = (event) => {
            reject(event.target.error)
        }
    })
}

async function storeGLBInIndexedDB(key, data) {
    return openDatabase().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite')
            const store = transaction.objectStore(STORE_NAME)
            const request = store.put(data, key)

            request.onsuccess = () => {
                resolve()
            }

            request.onerror = (event) => {
                reject(event.target.error)
            }
        })
    })
}

async function loadGLBFromIndexedDB(key) {
    return openDatabase().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly')
            const store = transaction.objectStore(STORE_NAME)
            const request = store.get(key)

            request.onsuccess = (event) => {
                resolve(event.target.result)
            }

            request.onerror = (event) => {
                reject(event.target.error)
            }
        })
    })
}

export default {
    apiGET(_path) {
        return apiGET(_path)
    },
    apiPOST(_path, param) {
        return apiPOST(_path, param)
    },

    install(Vue) {
        Vue.config.globalProperties.$storeGLBInIndexedDB = storeGLBInIndexedDB
        Vue.config.globalProperties.$loadGLBFromIndexedDB = loadGLBFromIndexedDB

        Vue.config.globalProperties.$base64toFile = base64toFile
        Vue.config.globalProperties.$fileToBase64 = fileToBase64

        Vue.config.globalProperties.$MONEY_FORMAT_TYPE = MONEY_FORMAT_TYPE

        Vue.config.globalProperties.$MONEY1 = MONEY1
        Vue.config.globalProperties.$MONEY1 = MONEY2

        Vue.config.globalProperties.$phoneMask = (str) => {
            if (!str || !str.length) {
                return ''
            }

            return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
        }

        Vue.config.globalProperties.$numberMask = (str_) => {
            const str = str_ + ''
            if (!str || !str.length) {
                return ''
            }

            return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
        }

        Vue.config.globalProperties.$allNumberMask = (str_) => {
            const str = str_ + ''

            if (!str || !str.length) {
                return ''
            }
            return str.replace(/[^0-9]/g, '')
        }

        Vue.config.globalProperties.$birthCheck = (userbirth) => {
            if (!userbirth || !userbirth.length) {
                return false
            }

            // 생년월일 유효성 검사
            let birth_pattern = /^\d{2}\d{2}\d{2}$/
            if (!birth_pattern.test(userbirth)) {
                return false
            } else {
                return true
            }
        }

        Vue.config.globalProperties.$dayjs = dayjs

        Vue.config.globalProperties.$btnOnRouter = (path, query = null) => {
            router.push({ path: path, query: query })
        }

        Vue.config.globalProperties.$dateDiff = (date1_, date2_) => {
            const date1 = dayjs(date1_)
            const date2 = dayjs(date2_)

            return date1.diff(date2, 'day') - 1 // 402
        }
        Vue.config.globalProperties.$dateNow = () => {
            return dayjs().format('YYYY.MM.DD HH:mm')
        }
        Vue.config.globalProperties.$dateAdd = (month) => {
            return dayjs().add(month, 'month').format('YYYY.MM.DD')
        }

        Vue.config.globalProperties.$dateFormat = (val, format) => {
            if (!val) {
                return
            }
            return dayjs(val).format(format)
        }

        Vue.config.globalProperties.$btnOnRouterBack = () => {
            router.go(-1)
        }

        Vue.config.globalProperties.$btnOnLogin = (level = null) => {
            store.dispatch('callSetUserInfo', level)
        }

        Vue.config.globalProperties.$py_m2_ex = (val) => {
            return Number((val * PY_M2_EX).toFixed(2))
        }

        Vue.config.globalProperties.$m2_py_ex = (val) => {
            return Number((val * M2_PY_EX).toFixed(2))
        }

        Vue.config.globalProperties.$dateWeekFormat = () => {
            return {
                s: dayjs().weekday(1).format('YYYY-MM-DD'),
                e: dayjs().weekday(7).format('YYYY-MM-DD')
            }
        }

        Vue.config.globalProperties.$dateNowFormat = () => {
            return {
                s: dayjs().format('YYYY-MM-DD'),
                e: dayjs().format('YYYY-MM-DD')
            }
        }

        Vue.config.globalProperties.$datetimeNowFormat = () => {
            return dayjs().format('YYYY-MM-DD hh:mm:ss')
        }

        Vue.config.globalProperties.$datetimeFormat = (day) => {
            if (typeof day != 'string') {
                return null
            } else if (day == '0000-00-00' || day == null || !day.length) {
                return null
            } else {
                return dayjs(day).format('MM-DD hh:mm')
            }
        }

        Vue.config.globalProperties.$dateSub = (day) => {
            const masTime = new Date(day)
            const todayTime = new Date()
            todayTime.setHours(0, 0, 0, 0)
            const diff = masTime - todayTime
            const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24))

            if (diffDay < 0) {
                return ''
            } else if (diffDay == 0) {
                return '오늘까지'
            } else {
                return 'D-' + diffDay
            }
        }

        Vue.config.globalProperties.$numberToKorean = (number) => {
            if (number) {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            } else {
                return 0
            }
        }

        Vue.config.globalProperties.$formatMoney = (e, t, a) => {
            return c(e, t, !0, a)
        }

        Vue.config.globalProperties.$formatMoneyBasedOnWon = (e, t, a) => {
            var r = e
            return 'string' == typeof e && (r = parseInt(e, 10)), c(r, t, !1, a)
        }

        Vue.config.globalProperties.$groupBy = (data, key) => {
            return data.reduce(function (carry, el) {
                var group = el[key]

                if (carry[group] === undefined) {
                    carry[group] = []
                }

                carry[group].push(el)
                return carry
            }, {})
        }
        Vue.config.globalProperties.$isEmpty = (value) => {
            if (
                value == '' ||
                value == null ||
                value == undefined ||
                (value != null && typeof value == 'object' && !Object.keys(value).length)
            ) {
                return false
            } else {
                return true
            }
        }
        Vue.config.globalProperties.$pageDataSetting = (total, limit, block, page) => {
            this.isAllCheck = false
            const totalPage = Math.ceil(total / limit)
            let currentPage = page
            const first = currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null
            const end =
                totalPage !== currentPage ? parseInt(currentPage, 10) + parseInt(1, 10) : null

            let startIndex = (Math.ceil(currentPage / block) - 1) * block + 1
            let endIndex = startIndex + block > totalPage ? totalPage : startIndex + block - 1
            let list = []
            for (let index = startIndex; index <= endIndex; index++) {
                list.push(index)
            }
            return { first, end, list, currentPage, totalPage }
        }
        Vue.config.globalProperties.$objCompare = (pt1, pt2) => {
            if (pt1.x === pt2.x && pt1.y === pt2.y) {
                return true
            }
            return false
        }

        Vue.config.globalProperties.$apiGET = apiGET

        Vue.config.globalProperties.$apiPOST = apiPOST

        Vue.config.globalProperties.$apiLOGIN = async (_path, param) => {
            const path = import.meta.env.VITE_HOST_BACK + _path

            try {
                const re = await axios.post(path, param)

                axios.defaults.headers.common.authorization = 'Bearer ' + re.data.token.accessToken
                axios.defaults.headers.common.refresh = 'Bearer ' + re.data.refreshToken

                store.dispatch('callSetToken', {
                    accessToken: 'Bearer ' + re.data.token.accessToken,
                    refreshToken: 'Bearer ' + re.data.token.refreshToken
                })

                const myInfo = await axios.get(import.meta.env.VITE_HOST_BACK + '/admin/myinfo')
                store.dispatch('callSetMyInfo', myInfo.data)

                // axios.defaults.headers.common.authorization = re.headers.authorization;
                // axios.defaults.headers.common.refresh = re.headers.refresh;

                router.push({ path: '/' })

                // return re.data
                return true
            } catch (e) {
                if (e.response.data.message) {
                    // alert(e.response.data.message)

                    return false
                }
                return
            }
        }

        Vue.config.globalProperties.$apiLOGOUT = async () => {
            const path = import.meta.env.VITE_HOST_BACK + '/admin/logout'
            try {
                const storeToken = store.getters.getToken
                if (storeToken) {
                    axios.defaults.headers.common.authorization = storeToken.accessToken
                    axios.defaults.headers.common.refresh = storeToken.refreshToken
                } else {
                    store.dispatch('callSetToken', {
                        accessToken: '',
                        refreshToken: ''
                    })
                    store.dispatch('callSetUserInfo', null)

                    return true
                }

                const re = await axios.post(path)

                if (re.data.status == 402) {
                    const ref = await axios.get(import.meta.env.VITE_HOST_BACK + '/user/refresh')
                    axios.defaults.headers.common.authorization = ref.data.data.accessToken
                    axios.defaults.headers.common.refresh = ref.data.data.refreshToken

                    store.dispatch('callSetToken', {
                        accessToken: ref.data.data.accessToken,
                        refreshToken: ref.data.data.refreshToken
                    })

                    await axios.post(path)

                    return true
                }

                store.dispatch('callSetToken', {
                    accessToken: '',
                    refreshToken: ''
                })

                router.push({ path: '/login' })

                return true
            } catch (e) {
                if (e.response.data.message) {
                    alert(e.response.data.message)
                }
                return
            }
        }

        Vue.config.globalProperties.$apiSocialLOGIN = async (param) => {
            axios.defaults.headers.common.authorization = 'Bearer ' + param.accessToken
            axios.defaults.headers.common.refresh = 'Bearer ' + param.refreshToken

            store.dispatch('callSetToken', {
                accessToken: 'Bearer ' + param.accessToken,
                refreshToken: 'Bearer ' + param.refreshToken
            })
        }

        Vue.config.globalProperties.$apiDOWN = async (_path, fileType) => {
            const path = import.meta.env.VITE_HOST_BACK + _path

            let msg = '잠시후 다시 시도 해주세요.'
            try {
                const storeToken = store.getters.getToken

                if (storeToken) {
                    axios.defaults.headers.common.authorization = storeToken.accessToken
                    axios.defaults.headers.common.refresh = storeToken.refreshToken
                }

                const re = await axios.get(path, {
                    responseType: 'arraybuffer',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: fileType
                    }
                })

                if (re.data.status == 402) {
                    const ref = await axios.get(import.meta.env.VITE_HOST_BACK + '/user/refresh')
                    axios.defaults.headers.common.authorization = ref.data.data.accessToken
                    axios.defaults.headers.common.refresh = ref.data.data.refreshToken

                    store.dispatch('callSetToken', {
                        accessToken: ref.data.data.accessToken,
                        refreshToken: ref.data.data.refreshToken
                    })

                    const re_ = await axios.get(path)
                    return re_.data
                } else {
                    return re.data
                }
            } catch (e) {
                if (e.response?.status == 401) {
                    axios.defaults.headers.common.authorization = ''
                    axios.defaults.headers.common.refresh = ''

                    router.push({
                        name: 'loginPage'
                    })
                    return
                } else {
                    if (e.response.data.message) {
                        alert(msg)
                    }
                }
            }
        }

        Vue.config.globalProperties.$checkPer = (mid) => {
            // console.log(store.getters.getUserInfo.mem_uid, mid);
            if (
                store.getters.getUserInfo.mem_uid == mid ||
                store.getters.getUserInfo.mem_type == 'master'
            ) {
                return true
            } else {
                return false
            }
        }

        Vue.config.globalProperties.$apiFormData = async (_path, obj, fileList) => {
            const path = import.meta.env.VITE_HOST_BACK + _path
            let msg = '잠시후 다시 시도 해주세요.'
            try {
                const header = {
                    'Content-Type': 'multipart/form-data'
                }
                let form = new FormData()

                for (var prop in obj) {
                    form.append(prop, obj[prop])
                }

                for (let i = 0; i < fileList.length; i++) {
                    form.append('files', await base64toFile(fileList[i]))
                }

                const storeToken = store.getters.getToken

                if (storeToken) {
                    axios.defaults.headers.common.authorization = storeToken.accessToken
                    axios.defaults.headers.common.refresh = storeToken.refreshToken
                }

                const re = await axios.post(path, form, header)
                if (re.data.status == 402) {
                    const ref = await axios.get(import.meta.env.VITE_HOST_BACK + '/user/refresh')
                    axios.defaults.headers.common.authorization = ref.data.data.accessToken
                    axios.defaults.headers.common.refresh = ref.data.data.refreshToken

                    store.dispatch('callSetToken', {
                        accessToken: ref.data.data.accessToken,
                        refreshToken: ref.data.data.refreshToken
                    })

                    const re_ = await axios.post(path, form, header)
                    return re_.data
                } else {
                    return re.data
                }
            } catch (e) {
                if (e.response?.status == 400) {
                    if (e.response?.data?.errors?.length) {
                        alert(e.response?.data.errors[0].msg)
                    }
                    return false
                } else if (e.response?.status == 401) {
                    axios.defaults.headers.common.authorization = ''
                    axios.defaults.headers.common.refresh = ''

                    router.push({
                        name: 'loginPage'
                    })
                    return
                } else if (e.response?.status == 500) {
                    if (e.response.data.message) {
                        alert(e.response.data.message)
                    } else {
                        alert(msg)
                    }

                    return false
                } else {
                    if (e.response.data.message) {
                        alert(msg)
                    }
                }
                return
            }
        }

        Vue.config.globalProperties.$getAlarmItem = (type) => {
            const alarmList = store.getters.getAlarmList
            for (let i = 0; i < alarmList.length; i++) {
                if (alarmList[i].type == type) {
                    if (alarmList[i].st == 'ALERT') {
                        return { a: 'warning', b: 'btn-purple' }
                    } else if (alarmList[i].st == 'ALARM') {
                        return { a: 'danger', b: 'btn-purple' }
                    } else {
                        //NORMAL
                        return { a: '', b: 'btn-grey' }
                    }
                }
            }

            return 'NORMAL'
        }

        Vue.config.globalProperties.$getAlarmGroup = (tgName) => {
            const alarmList = store.getters.getAlarmList

            const isGroup = {
                complex: 'Blade_Pitch',
                frame: 'Yaw',
                shaft_gear_gen_222: 'Gear_Box',
                'tower_(1)': 'Nacelle_Tower',
                '458654asd': 'Generator'
            }

            for (let i = 0; i < alarmList.length; i++) {
                if (alarmList[i].group == isGroup[tgName]) {
                    if (alarmList[i].st == 'ALERT') {
                        return '#FF6347'
                    } else if (alarmList[i].st == 'ALARM') {
                        return '#FF0000'
                    } else {
                        return '#FFFFFF'
                    }
                }
            }

            return '#FFFFFF'
        }

        Vue.config.globalProperties.$getAlarmPath = (tgName) => {
            const isGroup = {
                complex: 'diagnosis_1',
                'tower_(1)': 'diagnosis_2',
                shaft_gear_gen_222: 'diagnosis_3',
                '458654asd': 'diagnosis_4',
                frame: 'diagnosis_5'
            }

            return isGroup[tgName]
        }
    }
}
