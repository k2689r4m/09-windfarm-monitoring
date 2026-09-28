<template>
  <div class="content">
    <div class="section">
      <div class="section-tit">
        입찰 예약 목록
        <div class="right">
          <button class="btn btn-xsm btn-secondary ms-5" @click="isPopupShow = true">
            등록 예약
          </button>
        </div>
      </div>
      <div class="table-wrap">
        <div class="table-wrap">
          <div class="table-wrap">
            <table class="table type-input">
              <tr>
                <th>url</th>
                <td>
                  <input
                    type="text"
                    min="0"
                    max="10"
                    class="form-control sm m-r--1"
                    v-model="itemInfo.url"
                  />
                </td>
              </tr>
              <tr>
                <th>최종입찰자</th>
                <td>
                  <select
                    class="form-control sm m-r--1 select"
                    :disabled="itemInfo.st3 == 'Y'"
                    v-model="itemInfo.mid"
                  >
                    <option :value="null">선택</option>
                    <option v-for="m in memList" :key="'m_' + m.id" :value="m.id">
                      {{ m.mem_id }}
                    </option>
                  </select>
                  <label class="input-checkbox float-right">
                    <input
                      type="checkbox"
                      true-value="Y"
                      false-value="N"
                      v-model="itemInfo.st3"
                      @change="itemInfo.mid = null"
                    />
                    <span class="checkbox"></span>
                    <span class="text">랜덤</span>
                  </label>
                </td>
              </tr>
              <tr>
                <th>상한가</th>
                <td>
                  <money3
                    class="form-control sm m-r--1"
                    v-bind="mConfig"
                    v-model="itemInfo.maxPrice"
                  ></money3>
                  원
                </td>
              </tr>
              <tr>
                <th>최종 입찰 시간</th>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    class="form-control sm m-r--1"
                    v-model="itemInfo.finalTime"
                  />
                  ms
                </td>
              </tr>
              <tr>
                <th>입찰가</th>
                <td>
                  <money3
                    class="form-control sm m-r--1"
                    v-bind="mConfig"
                    v-model="itemInfo.unitPrice"
                  ></money3>
                  원
                  <label class="input-checkbox float-right">
                    <input type="checkbox" true-value="Y" false-value="N" v-model="itemInfo.st2" />
                    <span class="checkbox"></span>
                    <span class="text">자동입찰</span>
                  </label>
                </td>
              </tr>
              <tr>
                <th>마감 시간</th>
                <td>
                  <input
                    class="form-control sm"
                    type="datetime-local"
                    v-model="itemInfo.startDate"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isPopupShow" class="popup-wrap">
      <div class="dim" @click="isPopupShow = false"></div>
      <div class="popup sm">
        <div class="popup-tit">
          입찰 예약 등록
          <button type="button" class="btn btn-close" @click="isPopupShow = false">
            <b-icon-x-lg />
          </button>
        </div>
        <div class="popup-con">
          <div class="table-wrap">
            <div class="table-wrap">
              <table class="table type-input">
                <tr>
                  <th>url</th>
                  <td>
                    <input
                      type="text"
                      min="0"
                      max="10"
                      class="form-control sm m-r--1"
                      v-model="itemInfo.url"
                    />
                  </td>
                </tr>
                <tr>
                  <th>최종입찰자</th>
                  <td>
                    <select
                      class="form-control sm m-r--1 select"
                      :disabled="itemInfo.st3 == 'Y'"
                      v-model="itemInfo.mid"
                    >
                      <option :value="null">선택</option>
                      <option v-for="m in memList" :key="'m_' + m.id" :value="m.id">
                        {{ m.mem_id }}
                      </option>
                    </select>
                    <label class="input-checkbox float-right">
                      <input
                        type="checkbox"
                        true-value="Y"
                        false-value="N"
                        v-model="itemInfo.st3"
                        @change="itemInfo.mid = null"
                      />
                      <span class="checkbox"></span>
                      <span class="text">랜덤</span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>상한가</th>
                  <td>
                    <money3
                      class="form-control sm m-r--1"
                      v-bind="mConfig"
                      v-model="itemInfo.maxPrice"
                    ></money3>
                    원
                  </td>
                </tr>
                <tr>
                  <th>최종 입찰 시간</th>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      class="form-control sm m-r--1"
                      v-model="itemInfo.finalTime"
                    />
                    ms
                  </td>
                </tr>
                <tr>
                  <th>입찰가</th>
                  <td>
                    <money3
                      class="form-control sm m-r--1"
                      v-bind="mConfig"
                      v-model="itemInfo.unitPrice"
                    ></money3>
                    원
                    <label class="input-checkbox float-right">
                      <input
                        type="checkbox"
                        true-value="Y"
                        false-value="N"
                        v-model="itemInfo.st2"
                      />
                      <span class="checkbox"></span>
                      <span class="text">자동입찰</span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>마감 시간</th>
                  <td>
                    <input
                      class="form-control sm"
                      type="datetime-local"
                      v-model="itemInfo.startDate"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="btn-wrap">
            <button type="button" class="btn btn-md btn-secondary" @click="isPopupShow = false">
              취소
            </button>
            <button type="button" class="btn btn-md btn-primary" @click="runAdd">추가</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isEditPopupShow" class="popup-wrap">
      <div class="dim" @click="isEditPopupShow = false"></div>
      <div class="popup sm">
        <div class="popup-tit">
          입찰 예약 수정
          <button type="button" class="btn btn-close" @click="isEditPopupShow = false">
            <b-icon-x-lg />
          </button>
        </div>
        <div class="popup-con">
          <div class="table-wrap">
            <div class="table-wrap">
              <table class="table type-input">
                <tr>
                  <th>url</th>
                  <td>
                    <input
                      type="text"
                      min="0"
                      max="10"
                      class="form-control sm m-r--1"
                      v-model="itemInfo.url"
                    />
                  </td>
                </tr>
                <tr>
                  <th>최종입찰자</th>
                  <td>
                    <select
                      class="form-control sm m-r--1 select"
                      :disabled="itemInfo.st3 == 'Y'"
                      v-model="itemInfo.mid"
                    >
                      <option :value="null">선택</option>
                      <option v-for="m in memList" :key="'m_' + m.id" :value="m.id">
                        {{ m.mem_id }}
                      </option>
                    </select>
                    <label class="input-checkbox float-right">
                      <input
                        type="checkbox"
                        true-value="Y"
                        false-value="N"
                        v-model="itemInfo.st3"
                        @change="itemInfo.mid = null"
                      />
                      <span class="checkbox"></span>
                      <span class="text">랜덤</span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>상한가</th>
                  <td>
                    <money3
                      class="form-control sm m-r--1"
                      v-bind="mConfig"
                      v-model="itemInfo.maxPrice"
                    ></money3>
                    원
                  </td>
                </tr>
                <tr>
                  <th>최종 입찰 시간</th>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      class="form-control sm m-r--1"
                      v-model="itemInfo.finalTime"
                    />
                    ms
                  </td>
                </tr>
                <tr>
                  <th>입찰가</th>
                  <td>
                    <money3
                      class="form-control sm m-r--1"
                      v-bind="mConfig"
                      v-model="itemInfo.unitPrice"
                    ></money3>
                    원
                    <label class="input-checkbox float-right">
                      <input
                        type="checkbox"
                        true-value="Y"
                        false-value="N"
                        v-model="itemInfo.st2"
                      />
                      <span class="checkbox"></span>
                      <span class="text">자동입찰</span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>마감 시간</th>
                  <td>
                    <input
                      class="form-control sm"
                      type="datetime-local"
                      v-model="itemInfo.startDate"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="btn-wrap">
            <button type="button" class="btn btn-md btn-secondary" @click="isEditPopupShow = false">
              취소
            </button>
            <button type="button" class="btn btn-md btn-primary" @click="runEdit">수정</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'SystemAdmin9',
  components: {},
  data() {
    return {
      itemInfo: null,
      runList: [],
      memList: [],

      isPopupShow: false,
      isEditPopupShow: false,

      mConfig: {
        precision: 0,
        thousands: ',',
        disableNegative: true,
        min: null,
        max: null
      },

      moneyReg: /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.clearItem()
      this.getItemList()
      this.getMemberList()
    },
    getMemberList() {
      this.$apiGET('/admin/member2').then((re) => {
        this.memList = re
      })
    },
    getItemList() {
      this.$apiGET('/admin/run').then((re) => {
        this.runList = re
      })
    },
    runAdd() {
      if (!this.itemInfo.url) {
        alert('url 를 입력해 주세요.')
        return
      }

      if (this.itemInfo.st3 == 'N' && !this.itemInfo.mid) {
        alert('최종 입찰자를 선택해 주세요.')
        return
      }

      if (!Number(this.itemInfo.maxPrice)) {
        alert('상한가 를 입력해 주세요.')
        return
      }

      if (!this.itemInfo.finalTime) {
        alert('최종입찰시간 을 입력해 주세요.')
        return
      }

      if (!Number(this.itemInfo.unitPrice)) {
        alert('입찰가 를 입력해 주세요.')
        return
      }

      if (!this.itemInfo.startDate) {
        alert('마감시간 을 입력해 주세요.')
        return
      }

      try {
        const url = new URL(this.itemInfo.url.toLowerCase())
        const urlParams = url.searchParams
        const itemno = urlParams.get('itemno')

        if (!itemno) {
          alert('잘못된 url 입니다.')
          return
        }

        this.itemInfo.itemId = itemno.toUpperCase()
      } catch (e) {
        alert('잘못된 url 입니다.')
        return
      }

      this.$apiPOST('/admin/run/add', this.itemInfo).then((re) => {
        if (re) {
          this.init()
          alert('추가 완료')
        }
      })
    },
    runEdit() {
      if (!this.itemInfo.url) {
        alert('url 를 입력해 주세요.')
        return
      }

      if (this.itemInfo.st3 == 'N' && !this.itemInfo.mid) {
        alert('최종 입찰자를 선택해 주세요.')
        return
      }

      if (!Number(this.itemInfo.maxPrice)) {
        alert('상한가 를 입력해 주세요.')
        return
      }

      if (!this.itemInfo.finalTime) {
        alert('최종입찰시간 을 입력해 주세요.')
        return
      }

      if (!Number(this.itemInfo.unitPrice)) {
        alert('입찰가 를 입력해 주세요.')
        return
      }

      if (!this.itemInfo.startDate) {
        alert('마감시간 을 입력해 주세요.')
        return
      }

      try {
        const url = new URL(this.itemInfo.url)
        const urlParams = url.searchParams
        const itemno = urlParams.get('itemno')

        if (!itemno) {
          alert('잘못된 url 입니다.')
          return
        }

        this.itemInfo.itemId = itemno
      } catch (e) {
        alert('잘못된 url 입니다.')
        return
      }

      this.$apiPOST('/admin/run/edit', this.itemInfo).then((re) => {
        if (re) {
          this.init()
          alert('수정 완료')
        }
      })
    },
    runStop(id) {
      this.$apiPOST('/admin/run/stop', { id: id }).then((re) => {
        if (re) {
          this.init()
          alert('중지 완료')
        }
      })
    },
    runDel(isId) {
      if (confirm('삭제하시겠습니까?')) {
        this.$apiPOST('/admin/run/del', { id: isId }).then((re) => {
          if (re) {
            this.init()
            alert('삭제 완료')
          }
        })
      }
    },
    onEdit(item) {
      this.clearItem()
      this.isEditPopupShow = true
      this.itemInfo = _.cloneDeep(item)
      this.itemInfo.startDate = this.$dateFormat(this.itemInfo.startDate, 'YYYY-MM-DD HH:mm')
    },
    clearItem() {
      this.isPopupShow = false
      this.isEditPopupShow = false
      this.itemInfo = {
        id: null,
        mid: null,
        itemId: '',
        url: '',
        maxPrice: 0,
        finalTime: 300,
        unitPrice: 0,
        startDate: '',
        st2: 'Y',
        st3: 'Y'
      }
    }
  }
}
</script>
