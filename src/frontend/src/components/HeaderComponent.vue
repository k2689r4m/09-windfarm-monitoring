<template>
    <div class="header">
        <div class="header-wrap">
            <div class="logo">LOGO <span>풍력수명예측</span></div>
            <div class="menu">
                <button type="button" class="btn active">풍력수명예측</button>
            </div>
            <div class="right">
                <span class="txt">{{ nowDate }}</span>
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
            nowDate: '',
            alarmList: []
        }
    },
    watch: {},
    created() {
        this.headerCheck()
        this.timerStop(this.timer)
    },
    updated() {},
    methods: {
        init() {
            this.timer = this.timerStart()
        },
        timerStart() {
            var interval = setInterval(() => {
                this.nowDate = this.$dateNow()
                // this.getAlarm()
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
                this.alarmList = data
            })
        }
    }
}
</script>
