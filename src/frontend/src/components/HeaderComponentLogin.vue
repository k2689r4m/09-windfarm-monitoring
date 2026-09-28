<template>
    <div class="header">
        <div class="header-wrap">
            <div class="logo">LOGO <span>풍력수명예측</span></div>
            <div class="menu">
                <button
                    type="button"
                    class="btn"
                    :class="{
                        active: this.$route.name == 'mainPage'
                    }"
                    @click="$btnOnRouter('/')"
                >
                    HOME
                </button>
                <button
                    type="button"
                    class="btn"
                    @click="$btnOnRouter('/overview_1')"
                    :class="{
                        active: this.$route.name.substr(0, 12) == 'overviewPage'
                    }"
                >
                    Overview
                </button>
                <button
                    type="button"
                    class="btn"
                    @click="$btnOnRouter('/diagnosis_1')"
                    :class="{
                        active: this.$route.name.substr(0, 13) == 'diagnosisPage'
                    }"
                >
                    진단
                </button>
                <button
                    type="button"
                    class="btn"
                    @click="$btnOnRouter('/history')"
                    :class="{
                        active: this.$route.name == 'historyPage'
                    }"
                >
                    이력확인
                </button>
                <button
                    type="button"
                    class="btn"
                    :class="{
                        active: this.$route.name == 'alarmPage'
                    }"
                    @click="$btnOnRouter('/alarm')"
                >
                    알람
                </button>
                <button
                    type="button"
                    class="btn"
                    :class="{
                        active: this.$route.name == 'settingPage'
                    }"
                    @click="$btnOnRouter('/setting')"
                >
                    설정
                </button>
            </div>
            <div class="right">
                <span class="txt">자원A (풍력)</span>
                <span class="txt">{{ nowDate }}</span>
                <button type="button" class="btn btn-alarm"></button>
                <button type="button" class="btn btn-logout" @click="$apiLOGOUT"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderComponent',
    components: {},
    computed: {},
    data() {
        return {
            loginPage: false,
            timer: null,
            nowDate: ''
        }
    },
    watch: {},
    created() {
        this.headerCheck()
        this.init()
    },
    updated() {},
    beforeDestroy() {
        this.timerStop(this.timer)
    },
    methods: {
        init() {
            this.timer = this.timerStart()
        },
        timerStart() {
            var interval = setInterval(() => {
                this.nowDate = this.$dateNow()
                this.getAlarm()
            }, 10000)
            return interval
        },
        timerStop(Timer) {
            clearInterval(Timer)
        },
        headerCheck() {
            this.$route.name == 'loginPage' ? (this.loginPage = true) : (this.loginPage = false)
        },
        getAlarm() {
            this.$apiGET('/admin/alarm/item').then((data) => {
                // this.alarmList = data
                this.$store.dispatch('callSetAlarmList', data)
            })
        }
    }
}
</script>
