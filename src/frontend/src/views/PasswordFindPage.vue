<template>
	<div class="section login type2">
		<div class="login-wrap">
			<div class="logo">LOGO</div>
			<div class="section-guide">최초 접속 시 비밀번호를 변경해야합니다.</div>
			<div class="input-wrap">
				<label class="input-label">이전 비밀번호</label>
				<input type="password" class="input-text h-56" />
			</div>
			<div class="input-guide error">
				비밀번호가 일치하지 않습니다.
			</div>
			<div class="input-wrap">
				<label class="input-label">새 비밀번호</label>
				<input type="password" class="input-text h-56" />
			</div>
			<div class="input-guide collect">
				사용 가능한 비밀번호 입니다.
			</div>
			<div class="input-wrap">
				<label class="input-label">비밀번호 확인</label>
				<input type="password" class="input-text h-56" />
			</div>
			<div class="input-guide error">
				<!-- 비밀번호가 일치하지 않습니다. -->
			</div>
			<div class="btn-wrap">
				<button
					type="button"
					class="btn btn-primary btn-full"
				>
					비밀번호 변경
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PasswordFindPage',
	components: {},
	computed: {},
	data() {
		return {};
	},
	created() {},
	mounted() {},
	updated() {},
	methods: {},
};
</script>
