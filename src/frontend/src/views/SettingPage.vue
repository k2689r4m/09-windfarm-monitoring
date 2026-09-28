<template>
    <div class="section">
        <div class="tab-btn">
            <template v-if="$store.getters.getMyInfo.grade == 0">
                <button
                    type="button"
                    class="btn"
                    :class="{ active: tabActive == 'tab1' }"
                    @click="tapChange('tab1')"
                >
                    계정 설정
                </button>
                <button
                    type="button"
                    class="btn"
                    :class="{ active: tabActive == 'tab2' }"
                    @click="tapChange('tab2')"
                >
                    내 계정 정보
                </button>
            </template>
        </div>
        <div class="tab-con" v-if="tabActive == 'tab1'">
            <div class="card-wrap">
                <div class="card-wrap--p">
                    <div class="card-tit">
                        계정 설정
                        <div class="right">
                            <button
                                type="button"
                                class="btn btn-add btn-normal btn-grey"
                                @click="onAddMember"
                            >
                                계정 추가
                            </button>
                        </div>
                    </div>
                    <div class="table-wrap--fix">
                        <table class="table">
                            <colgroup>
                                <col width="8%" />
                                <col width="25%" />
                                <col width="25%" />
                                <col width="25%" />
                                <col width="8%" />
                                <col width="8%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>
                                        <button type="button" class="btn btn-sort">아이디</button>
                                    </th>
                                    <th>
                                        <button type="button" class="btn btn-sort active">
                                            이름
                                        </button>
                                    </th>
                                    <th>권한</th>
                                    <th>수정</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(m, idx) in memberList" :key="'_member_' + m.id">
                                    <td>{{ idx }}</td>
                                    <td>asdasd****</td>
                                    <td>12312312312312312312</td>
                                    <td>user</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-icon btn-modi"
                                        ></button>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-icon btn-delete"
                                        ></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table-wrap">
                        <table class="table">
                            <colgroup>
                                <col width="8%" />
                                <col width="25%" />
                                <col width="25%" />
                                <col width="25%" />
                                <col width="8%" />
                                <col width="8%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>
                                        <button type="button" class="btn btn-sort">아이디</button>
                                    </th>
                                    <th>
                                        <button type="button" class="btn btn-sort">이름</button>
                                    </th>
                                    <th>권한</th>
                                    <th>수정</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(m, idx) in memberList" :key="'member_' + m.id">
                                    <td>{{ idx + 1 }}</td>
                                    <td>{{ m.mem_id }}</td>
                                    <td>{{ m.mem_name }}</td>
                                    <td>{{ m.grade == 0 ? 'admin' : 'user' }}</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-icon btn-modi"
                                            @click="getMemberItem(m.id)"
                                        ></button>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-icon btn-delete"
                                            @click="delUser(m.id)"
                                        ></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-con" v-else-if="tabActive == 'tab2'">
            <div class="card-wrap" v-if="memberItem">
                <div class="card-wrap--p">
                    <div class="card-tit">내 계정 정보</div>
                    <ul class="info-list">
                        <li class="info-list--item">
                            <div class="item-wrap">
                                <label class="label">· 이름</label>
                                <span class="text">{{ memberItem.mem_name }}</span>
                            </div>
                        </li>
                        <li class="info-list--item">
                            <div class="item-wrap">
                                <label class="label">· 권한</label>
                                <span class="text">{{ memberItem.gradeKo }}</span>
                            </div>
                        </li>
                        <li class="info-list--item">
                            <div class="item-wrap">
                                <label class="label">· 아이디</label>
                                <span class="text">{{ memberItem.mem_id }}</span>
                            </div>
                        </li>
                        <li class="info-list--item">
                            <div class="item-wrap">
                                <label class="label">· 비밀번호</label>
                                <span class="text">••••••</span>
                                <button
                                    type="button"
                                    class="btn btn-grey"
                                    @click="(modalMemberPass1 = true), (memberItem.pass = '')"
                                >
                                    변경
                                </button>
                            </div>
                        </li>
                        <!-- <li class="info-list--item">
							<div class="item-wrap">
								<label class="label">· 이메일</label>
								<span class="text">0000@vgen.co.kr</span>
								<button type="button" class="btn btn-grey">
									변경
								</button>
							</div>
							<div class="item-wrap">
								<label class="label wd-200"
									>· 이메일 알림 동의/거부</label
								>
								<label class="input-radio">
									<input type="radio" name="radio1" checked />
									<span class="box"></span>
									<span class="text">동의</span>
								</label>
								<label class="input-radio">
									<input type="radio" name="radio1" />
									<span class="box"></span>
									<span class="text">거부</span>
								</label>
							</div>
						</li>
						<li class="info-list--item">
							<div class="item-wrap">
								<label class="label">· 전화번호</label>
								<span class="text">000-0000-0000</span>
								<button type="button" class="btn btn-grey">
									변경
								</button>
							</div>
							<div class="item-wrap">
								<label class="label wd-200"
									>· SMS/카톡 알림 동의/거부</label
								>
								<label class="input-radio">
									<input type="radio" name="radio2" checked />
									<span class="box"></span>
									<span class="text">동의</span>
								</label>
								<label class="input-radio">
									<input type="radio" name="radio2" />
									<span class="box"></span>
									<span class="text">거부</span>
								</label>
							</div>
						</li> -->
                    </ul>
                    <div class="btn-wrap">
                        <!-- <button type="button" class="btn btn-primary btn-md">저장</button> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- 계정 추가 -->
        <div class="modal" v-bind:class="{ show: modalMemberAdd }">
            <div class="modal-dim" @click="modalMemberAdd = false"></div>
            <div class="modal-con md" v-if="memberItem">
                <div class="modal-tit">
                    계정 추가
                    <button
                        type="button"
                        class="btn btn-close"
                        @click="modalMemberAdd = false"
                    ></button>
                </div>
                <div class="input-wrap">
                    <label class="input-label">이름</label>
                    <input
                        type="text"
                        class="input-text"
                        placeholder="이름을 입력해주세요"
                        v-model="memberItem.mem_name"
                    />
                    <div class="space"></div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">아이디</label>
                    <input
                        type="text"
                        class="input-text"
                        placeholder="아이디를 입력해주세요"
                        v-model="memberItem.mem_id"
                        @change="memberItem.idCK = false"
                    />
                    <div class="btn-wrap">
                        <button type="button" class="btn btn-grey btn-normal" @click="idCK">
                            중복 확인
                        </button>
                    </div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">비밀번호</label>
                    <input
                        type="password"
                        class="input-text"
                        placeholder="영문 대소문자, 숫자, 특수문자 포함 8~12자"
                        v-model="memberItem.password1"
                    />
                    <div class="space"></div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">비밀번호 확인</label>
                    <input
                        type="password"
                        class="input-text"
                        placeholder="비밀번호를 입력해주세요"
                        v-model="memberItem.password2"
                    />
                    <div class="space"></div>
                </div>

                <template v-if="memberItem.password1 || memberItem.password2">
                    <div
                        v-if="memberItem.password1 == memberItem.password2"
                        class="input-guide type2 collect"
                    >
                        비밀번호가 일치합니다.
                    </div>
                    <div v-else class="input-guide type2 error">비밀번호가 일치하지 않습니다.</div>
                </template>

                <div class="input-wrap">
                    <label class="input-label">권한</label>
                    <input
                        type="text"
                        class="input-text"
                        v-model="memberItem.gradeKo"
                        placeholder="admin, user"
                    />
                    <div class="space"></div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">비고</label>
                    <textarea
                        class="input-textarea"
                        rows="3"
                        placeholder="내용을 입력해주세요"
                        v-model="memberItem.memo"
                    ></textarea>
                </div>
                <div class="btn-wrap">
                    <button type="button" class="btn btn-md btn-primary" @click="addUser">
                        계정 등록
                    </button>
                </div>
            </div>
        </div>

        <!-- 계정 수정 -->
        <div class="modal" v-bind:class="{ show: modalMemberEdit }">
            <div class="modal-dim" @click="modalMemberEdit = false"></div>
            <div class="modal-con md" v-if="memberItem">
                <div class="modal-tit">
                    계정 수정
                    <button
                        type="button"
                        class="btn btn-close"
                        @click="modalMemberEdit = false"
                    ></button>
                </div>
                <div class="input-wrap">
                    <label class="input-label">이름</label>
                    <input
                        type="text"
                        class="input-text"
                        placeholder="이름을 입력해주세요"
                        v-model="memberItem.mem_name"
                    />
                    <div class="space"></div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">아이디</label>
                    <input
                        type="text"
                        class="input-text"
                        placeholder="아이디를 입력해주세요"
                        v-model="memberItem.mem_id"
                        readonly
                    />
                    <div class="btn-wrap">
                        <!-- <button type="button" class="btn btn-grey btn-normal">중복 확인</button> -->
                    </div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">비밀번호</label>
                    <input
                        type="password"
                        class="input-text"
                        placeholder="영문 대소문자, 숫자, 특수문자 포함 8~12자"
                        v-model="memberItem.password1"
                    />
                    <div class="space"></div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">비밀번호 확인</label>
                    <input
                        type="password"
                        class="input-text"
                        placeholder="비밀번호를 입력해주세요"
                        v-model="memberItem.password2"
                    />
                    <div class="space"></div>
                </div>

                <template v-if="memberItem.password1 || memberItem.password2">
                    <div
                        v-if="memberItem.password1 == memberItem.password2"
                        class="input-guide type2 collect"
                    >
                        비밀번호가 일치합니다.
                    </div>
                    <div v-else class="input-guide type2 error">비밀번호가 일치하지 않습니다.</div>
                </template>

                <div class="input-wrap">
                    <label class="input-label">권한</label>
                    <input
                        type="text"
                        class="input-text"
                        v-model="memberItem.gradeKo"
                        placeholder="admin, user"
                    />
                    <div class="space"></div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">비고</label>
                    <textarea
                        class="input-textarea"
                        rows="3"
                        placeholder="내용을 입력해주세요"
                        v-model="memberItem.memo"
                    ></textarea>
                </div>
                <div class="btn-wrap">
                    <button type="button" class="btn btn-md btn-primary" @click="editUser">
                        계정 수정
                    </button>
                </div>
            </div>
        </div>

        <div class="modal" v-bind:class="{ show: modalIdCK }">
            <div class="modal-dim" @click="(memberItem.idCK = false), (modalIdCK = false)"></div>
            <div class="modal-con alert">
                <div class="text">사용 가능한 아이디입니다.</div>
                <div class="btn-wrap">
                    <button
                        type="button"
                        class="btn btn-md btn-line"
                        @click="(memberItem.idCK = false), (modalIdCK = false)"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        class="btn btn-md btn-primary"
                        @click="(memberItem.idCK = true), (modalIdCK = false)"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>

        <div class="modal" v-bind:class="{ show: modalMemberPass1 }">
            <div class="modal-dim" @click="modalMemberPass1 = false"></div>
            <div class="modal-con md">
                <div class="modal-tit">
                    본인 확인
                    <button
                        type="button"
                        class="btn btn-close"
                        @click="modalMemberPass1 = false"
                    ></button>
                </div>
                <div class="input-wrap">
                    <label class="input-label">비밀번호 입력</label>
                    <input
                        type="password"
                        class="input-text"
                        placeholder="비밀번호를 입력해주세요"
                        v-model="memberItem.pass"
                    />
                </div>
                <div class="btn-wrap">
                    <button
                        type="button"
                        class="btn btn-md btn-line"
                        @click="modalMemberPass1 = false"
                    >
                        취소
                    </button>
                    <button type="button" class="btn btn-md btn-primary" @click="passCK">
                        확인
                    </button>
                </div>
            </div>
        </div>

        <div class="modal" v-bind:class="{ show: modalMemberPass2 }">
            <div class="modal-dim" @click="modalMemberPass2 = false"></div>
            <div class="modal-con md">
                <div class="modal-tit">
                    비밀번호 변경
                    <button
                        type="button"
                        class="btn btn-close"
                        @click="modalMemberPass2 = false"
                    ></button>
                </div>
                <div class="input-wrap">
                    <label class="input-label">새 비밀번호</label>
                    <input
                        type="password"
                        class="input-text"
                        placeholder="영문 대소문자, 숫자, 특수문자 포함 8~12자"
                        v-model="memberItem.password1"
                    />
                </div>
                <div class="input-wrap">
                    <label class="input-label">비밀번호 확인</label>
                    <input
                        type="password"
                        class="input-text"
                        placeholder="비밀번호를 입력해주세요"
                        v-model="memberItem.password2"
                    />
                </div>
                <template v-if="memberItem.password1 || memberItem.password2">
                    <div
                        v-if="memberItem.password1 == memberItem.password2"
                        class="input-guide type2 collect"
                    >
                        비밀번호가 일치합니다.
                    </div>
                    <div v-else class="input-guide type2 error">비밀번호가 일치하지 않습니다.</div>
                </template>

                <div class="btn-wrap">
                    <button
                        type="button"
                        class="btn btn-md btn-line"
                        @click="modalMemberPass2 = false"
                    >
                        취소
                    </button>
                    <button type="button" class="btn btn-md btn-primary" @click="passEdit">
                        저장
                    </button>
                </div>
            </div>
        </div>

        <div class="modal">
            <div class="modal-dim"></div>
            <div class="modal-con md">
                <div class="modal-tit">
                    이메일 변경
                    <button type="button" class="btn btn-close"></button>
                </div>
                <div class="input-wrap">
                    <label class="input-label">이메일</label>
                    <input type="text" class="input-text" placeholder="이메일을 입력해주세요" />
                    <div class="btn-wrap">
                        <button type="button" class="btn btn-grey btn-normal">인증번호 전송</button>
                    </div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">인증번호</label>
                    <input type="text" class="input-text" placeholder="인증번호를 입력해주세요" />
                    <div class="space"></div>
                </div>
                <div class="btn-wrap">
                    <button type="button" class="btn btn-md btn-line">취소</button>
                    <button type="button" class="btn btn-md btn-primary">저장</button>
                </div>
            </div>
        </div>

        <div class="modal">
            <div class="modal-dim"></div>
            <div class="modal-con md">
                <div class="modal-tit">
                    전화번호 변경
                    <button type="button" class="btn btn-close"></button>
                </div>
                <div class="input-wrap">
                    <label class="input-label">전화번호</label>
                    <input type="text" class="input-text" placeholder="전화번호를 입력해주세요" />
                    <div class="btn-wrap w-150">
                        <button type="button" class="btn btn-grey btn-normal">인증번호 전송</button>
                    </div>
                </div>
                <div class="input-wrap">
                    <label class="input-label">인증번호</label>
                    <input type="text" class="input-text" placeholder="인증번호를 입력해주세요" />
                    <div class="space">03:00</div>
                </div>
                <div class="input-guide type2 error">인증번호가 일치하지 않습니다.</div>
                <div class="btn-wrap">
                    <button type="button" class="btn btn-md btn-line">취소</button>
                    <button type="button" class="btn btn-md btn-primary">저장</button>
                </div>
            </div>
        </div>

        <ModalCom
            @onModalEvent="onModalEvent"
            :modalST="modalEvent.st"
            :msg="modalEvent.msg"
        ></ModalCom>
    </div>
</template>

<script>
import ModalCom from '../components/ModalCom.vue'

export default {
    name: 'SettingPage',
    components: { ModalCom },
    computed: {},
    data() {
        return {
            tabActive: 'tab1',

            memberList: [],
            memberItem: null,

            modalIdCK: false,
            idCKMsg: '',

            modalMemberAdd: false,
            modalMemberEdit: false,
            modalMemberPass1: false,
            modalMemberPass2: false,

            modalEvent: {
                st: false,
                msg: ''
            }
        }
    },
    created() {
        this.init()
    },
    mounted() {},
    updated() {},
    methods: {
        init() {
            if (this.$store.getters.getMyInfo.grade == 0) {
                this.tabActive = 'tab1'
            } else {
                this.tabActive = 'tab2'
            }

            this.tapChange(this.tabActive)
        },
        onModal(msg) {
            this.modalEvent.msg = msg
            this.modalEvent.st = true
        },
        onModalEvent(bool) {
            this.modalEvent.st = bool
        },
        tapChange(menu) {
            this.clearItem()
            if (menu == 'tab1') {
                this.getMemberList()
            } else if (menu == 'tab2') {
                this.getMemberMy()
            }

            this.tabActive = menu
        },
        getMemberMy() {
            this.$apiGET('/admin/setting/member/my').then((data) => {
                this.memberItem.mem_id = data.mem_id
                this.memberItem.mem_name = data.mem_name
                this.memberItem.grade = data.grade
                this.memberItem.memo = data.memo

                this.memberItem.grade == 0
                    ? (this.memberItem.gradeKo = 'admin')
                    : (this.memberItem.gradeKo = 'user')
            })
        },
        getMemberList() {
            this.$apiGET('/admin/setting/member').then((data) => {
                this.memberList = data
            })
        },
        getMemberItem(id) {
            this.clearItem()
            this.$apiGET('/admin/setting/member/item?id=' + id).then((data) => {
                this.memberItem.id = data.id
                this.memberItem.mem_id = data.mem_id
                this.memberItem.mem_name = data.mem_name
                this.memberItem.grade = data.grade
                this.memberItem.memo = data.memo

                this.memberItem.grade == 0
                    ? (this.memberItem.gradeKo = 'admin')
                    : (this.memberItem.gradeKo = 'user')

                this.modalMemberEdit = true
            })
        },
        onAddMember() {
            this.clearItem()
            this.modalMemberAdd = true
        },
        clearItem() {
            this.memberItem = {
                id: null,
                mem_id: '',
                mem_name: '',
                grade: '',
                gradeKo: '',
                memo: '',
                password1: '',
                password2: '',
                idCK: false,

                pass: '',
                passCK: false
            }
        },
        editUser() {
            if (!this.memberItem.mem_name) {
                this.onModal('이름을 입력해 주세요.')
                return
            }

            if (this.memberItem.password1 || this.memberItem.password2) {
                if (this.memberItem.password1 != this.memberItem.password2) {
                    this.onModal('비밀번호가 일치하지 않습니다.')
                    return
                }
            }

            if (this.memberItem.gradeKo != 'admin' && this.memberItem.gradeKo != 'user') {
                this.onModal('올바른 권한을 입력해 주세요.')
                return
            }

            this.memberItem.gradeKo == 'admin'
                ? (this.memberItem.grade = 0)
                : (this.memberItem.grade = 1)

            this.$apiPOST('/admin/setting/member/user/edit', this.memberItem).then((data) => {
                if (data) {
                    this.onModal('저장 완료')
                }

                this.getMemberList()
                this.modalMemberEdit = false
            })
        },
        idCK() {
            if (!this.memberItem.mem_id) {
                this.onModal('아이디를 입력해 주세요.')
                return
            }

            if (!(this.memberItem.mem_id.length >= 4 && this.memberItem.mem_id.length <= 12)) {
                this.onModal('4글자 이상 또는 12글자 이하 이어야 합니다.')
                return
            }

            if (!/^[A-Za-z0-9][A-Za-z0-9]*$/.test(this.memberItem.mem_id)) {
                this.onModal('영어 또는 숫자만 입력해 주세요.')
                return
            }

            this.$apiGET('/admin/setting/member/id?mem_id=' + this.memberItem.mem_id).then(
                (data) => {
                    if (data) {
                        this.idCKMsg = '사용 가능한 아이디입니다.'
                    } else {
                        this.idCKMsg = '중복된 아이디입니다.'
                    }
                    this.modalIdCK = true
                }
            )
        },
        addUser() {
            if (!this.memberItem.mem_name) {
                this.onModal('이름을 입력해 주세요.')
                return
            }

            if (!this.memberItem.mem_id) {
                this.onModal('아이디를 입력해 주세요.')
                return
            }

            if (!this.memberItem.idCK) {
                this.onModal('중복확인을 해주세요.')
                return
            }

            if (!this.memberItem.password1 || !this.memberItem.password2) {
                this.onModal('비밀번호를 입력해 주세요.')
                return
            }

            if (this.memberItem.password1 != this.memberItem.password2) {
                this.onModal('비밀번호가 일치하지 않습니다.')
                return
            }

            if (this.memberItem.gradeKo != 'admin' && this.memberItem.gradeKo != 'user') {
                this.onModal('올바른 권한을 입력해 주세요.')
                return
            }

            this.memberItem.gradeKo == 'admin'
                ? (this.memberItem.grade = 0)
                : (this.memberItem.grade = 1)

            this.$apiPOST('/admin/setting/member/user/add', this.memberItem).then((data) => {
                if (data) {
                    this.onModal('등록 완료')
                    this.getMemberList()
                    this.modalMemberAdd = false
                } else {
                    this.onModal('알수 없는 오류')
                }
            })
        },
        delUser(id) {
            if (!confirm('정말로 삭제하시겠습니까?')) {
                return
            }

            this.$apiPOST('/admin/setting/member/del', { id: id }).then((data) => {
                if (data) {
                    this.onModal('삭제 완료')
                    this.getMemberList()
                }
            })
        },
        passCK() {
            if (!this.memberItem.pass) {
                this.onModal('비밀번호를 입력해 주세요.')
                return
            }

            this.$apiGET('/admin/setting/info/pass/ck?password=' + this.memberItem.pass).then(
                (data) => {
                    if (data) {
                        this.memberItem.password1 = ''
                        this.memberItem.password2 = ''
                        this.modalMemberPass1 = false
                        this.modalMemberPass2 = true
                    } else {
                        this.onModal('비밀번호가 틀립니다.')
                        return
                    }
                    // this.modalIdCK = true
                }
            )
        },
        passEdit() {
            if (!this.memberItem.password1 || !this.memberItem.password2) {
                this.onModal('비밀번호를 입력해 주세요.')
                return
            }

            if (this.memberItem.password1 != this.memberItem.password2) {
                this.onModal('비밀번호가 일치하지 않습니다.')
                return
            }

            this.$apiPOST('/admin/setting/info/pass', { password: this.memberItem.password1 }).then(
                (data) => {
                    if (data) {
                        this.getMemberMy()
                        this.onModal('변경 완료')
                        this.modalMemberPass2 = false
                    } else {
                        this.onModal('알수 없는 오류')
                    }
                }
            )
        }
    }
}
</script>
