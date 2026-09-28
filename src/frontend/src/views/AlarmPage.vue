<template>
    <div class="section">
        <div class="card-wrap">
            <div class="card-wrap--p">
                <div class="card-tit">알람</div>
                <div class="search-wrap">
                    <label class="label">컴포넌트 선택</label>
                    <SlimSelect class="input-select" v-model="searchOption.group">
                        <option value="Blade_Pitch">Blade&Pitch (default)</option>
                        <option value="Nacelle_Tower">Nacelle&Tower</option>
                        <option value="Gear_Box">Gear Box</option>
                        <option value="Generator">Generator</option>
                        <option value="Yaw">Yaw</option>
                    </SlimSelect>
                    <label class="label">발생일시</label>
                    <input
                        type="date"
                        class="input-date"
                        placeholder="DD/MM/YY"
                        v-model="searchOption.date_s"
                    />
                    <SlimSelect class="input-select" v-model="searchOption.hh_s">
                        <option value="">HH</option>
                        <option v-for="item in 24" :key="item + 'h_s'" :value="item">
                            {{ item < 10 ? '0' + item : item }}
                        </option>
                    </SlimSelect>
                    <SlimSelect class="input-select" v-model="searchOption.mm_s">
                        <option value="">MM</option>
                        <option v-for="item in 59" :key="item + 'm_s'" :value="item">
                            {{ item < 10 ? '0' + item : item }}
                        </option>
                    </SlimSelect>

                    <span class="unit">~</span>

                    <input type="date" class="input-date" v-model="searchOption.date_e" />
                    <SlimSelect class="input-select" v-model="searchOption.hh_e">
                        <option value="">HH</option>
                        <option v-for="item in 24" :key="item + 'h_e'" :value="item">
                            {{ item < 10 ? '0' + item : item }}
                        </option>
                    </SlimSelect>
                    <SlimSelect class="input-select" v-model="searchOption.mm_e">
                        <option value="">MM</option>
                        <option v-for="item in 59" :key="item + 'm_e'" :value="item">
                            {{ item < 10 ? '0' + item : item }}
                        </option>
                    </SlimSelect>
                    <button
                        type="button"
                        class="btn btn-primary btn-normal btn-search"
                        @click="getItemList(1)"
                    >
                        검색
                    </button>
                    <div class="right">
                        <button
                            type="button"
                            class="btn btn-down btn-normal btn-grey"
                            @click="downloadExcel"
                        >
                            다운로드
                        </button>
                    </div>
                </div>
                <table class="table">
                    <colgroup>
                        <col width="8%" />
                        <col width="30%" />
                        <col width="30%" />
                        <col width="32%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>
                                <button type="button" class="btn btn-sort">설비</button>
                            </th>
                            <th>
                                <button type="button" class="btn btn-sort">발생일시</button>
                            </th>
                            <th>
                                <button type="button" class="btn btn-sort">알람내용</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in itemList" :key="'alarm_' + item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.group }}</td>
                            <td>{{ $dateFormat(item.created_at, 'YYYY-MM-DD HH:mm:ss') }}</td>
                            <td>{{ item.msg }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination-wrap">
                    <!-- <div class="pagination">
                        <button type="button" class="btn prev" disabled></button>
                        <button type="button" class="btn first" disabled></button>
                        <button type="button" class="btn active">1</button>
                        <button type="button" class="btn">2</button>
                        <button type="button" class="btn">3</button>
                        <span class="more">...</span>
                        <button type="button" class="btn">10</button>
                        <button type="button" class="btn next"></button>
                        <button type="button" class="btn last"></button>
                    </div> -->
                    <Pagination
                        @getItemList="getItemList"
                        :page="page"
                        :pageData="pageData"
                        :totalCount="totalCount"
                        :itemSize="itemSize"
                        :blockSize="blockSize"
                    ></Pagination>

                    <div class="right">
                        <SlimSelect class="input-select" v-model="pageSize" @change="changeSize">
                            <option value="10">10개보기</option>
                            <option value="20">20개보기</option>
                            <option value="30">30개보기</option>
                            <option value="50">50개보기</option>
                            <option value="100">100개보기</option>
                        </SlimSelect>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SlimSelect from '@slim-select/vue'
import Pagination from '../components/Pagination.vue'
import * as XLSX from 'xlsx'

export default {
    name: 'AlarmPage',
    components: { SlimSelect, Pagination },
    computed: {},
    data() {
        return {
            itemList: [],
            pageSize: '10',

            searchOption: {
                group: 'Blade_Pitch',
                date_s: '',
                date_e: '',
                hh_s: '',
                hh_e: '',
                mm_s: '',
                mm_e: ''
            },

            page: 1,
            pageData: null,
            totalCount: null,
            itemSize: 10,
            blockSize: 5
        }
    },
    created() {
        this.getItemList(1)
    },
    mounted() {},
    updated() {},
    methods: {
        changeSize() {
            this.itemSize = Number(this.pageSize)
            this.getItemList(this.page)
        },
        getItemList(pg) {
            console.log(this.searchOption)
            let dateS = ''
            let dateE = ''

            if (this.searchOption.date_s || this.searchOption.date_e) {
                if (!this.searchOption.date_s) {
                    this.searchOption.date_s = '1901-01-01'
                } else if (!this.searchOption.date_e) {
                    this.searchOption.date_e = '2025-01-01'
                }
            }

            dateS = `${this.searchOption.date_s} ${this.searchOption.hh_s ? this.searchOption.hh_s : '00'}:${this.searchOption.mm_s ? this.searchOption.mm_s : '00'}:00`
            dateE = `${this.searchOption.date_e} ${this.searchOption.hh_e ? this.searchOption.hh_e : '23'}:${this.searchOption.mm_e ? this.searchOption.mm_e : '59'}:00`

            if (dateS == 'Invalid Date' || !this.searchOption.date_s) {
                dateS = ''
            }

            if (dateE == 'Invalid Date' || !this.searchOption.date_e) {
                dateE = ''
            }

            console.log(dateS)

            this.$apiGET(
                '/admin/alarm/log?page=' +
                    (pg - 1) * this.itemSize +
                    '&size=' +
                    this.itemSize +
                    '&dateS=' +
                    dateS +
                    '&dateE=' +
                    dateE +
                    '&group=' +
                    this.searchOption.group
            ).then((data) => {
                this.itemList = data.item

                this.totalCount = data.pageInfo.totalCount
                this.page = pg
                this.pageData = this.$pageDataSetting(
                    this.totalCount,
                    this.itemSize,
                    this.blockSize,
                    this.page
                )
            })
        },
        downloadExcel() {
            let dateS = ''
            let dateE = ''

            if (this.searchOption.date_s || this.searchOption.date_e) {
                if (!this.searchOption.date_s) {
                    this.searchOption.date_s = '1901-01-01'
                } else if (!this.searchOption.date_e) {
                    this.searchOption.date_e = '2025-01-01'
                }
            }

            dateS = `${this.searchOption.date_s} ${this.searchOption.hh_s ? this.searchOption.hh_s : '00'}:${this.searchOption.mm_s ? this.searchOption.mm_s : '00'}:00`
            dateE = `${this.searchOption.date_e} ${this.searchOption.hh_e ? this.searchOption.hh_e : '23'}:${this.searchOption.mm_e ? this.searchOption.mm_e : '59'}:00`

            if (dateS == 'Invalid Date' || !this.searchOption.date_s) {
                dateS = ''
            }

            if (dateE == 'Invalid Date' || !this.searchOption.date_e) {
                dateE = ''
            }

            this.$apiGET(
                '/admin/alarm/log/all?dateS=' +
                    dateS +
                    '&dateE=' +
                    dateE +
                    '&group=' +
                    this.searchOption.group
            ).then((data) => {
                const worksheet = XLSX.utils.json_to_sheet(data)
                const workbook = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(workbook, worksheet, 'data')
                XLSX.writeFile(workbook, `${this.searchOption.group}.xlsx`)
            })
        }
    }
}
</script>
