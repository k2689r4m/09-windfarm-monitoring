<template>
    <div class="section login">
        <div class="login-wrap">
            <div class="logo">LOGO</div>
            <div class="input-wrap">
                <label class="input-label w-100">아이디</label>
                <input
                    type="text"
                    class="input-text h-56"
                    v-model="userInfo.userId"
                    @keyup.enter="btnLogin"
                />
            </div>
            <div class="input-wrap">
                <label class="input-label w-100">비밀번호</label>
                <input
                    type="password"
                    class="input-text h-56"
                    v-model="userInfo.password"
                    @keyup.enter="btnLogin"
                />
            </div>
            <div v-if="st" class="input-guide error txt-center">
                아이디 또는 비밀번호가 일치하지 않습니다.
            </div>
            <div class="btn-wrap">
                <button type="button" class="btn btn-primary btn-full" @click="btnLogin">
                    로그인
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    components: {},
    computed: {},
    data() {
        return { userInfo: { userId: '', password: '' }, st: false }
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        btnLogin() {
            this.$apiLOGIN('/user/admin/login', this.userInfo).then((re) => {
                if (!re) {
                    this.st = true
                }
            })
        }
    }
}
</script>
